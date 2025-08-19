// server/utils/llm.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper: wait function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateLLMRoadmap(
  { role, timeline, hoursOfStudy, marksObtained, skillsHave = [], skillsLack = [] },
  retryCount = 0
) {
  try {
    const prompt = `
You are an AI career mentor. Generate a structured learning roadmap for a person preparing for the role of **${role}**.
- Available timeline: ${timeline} months
- Daily study hours: ${hoursOfStudy}
- Marks obtained in entry test: ${marksObtained}
- Skills they already have: ${skillsHave.length ? skillsHave.join(", ") : "None"}
- Skills they lack: ${skillsLack.length ? skillsLack.join(", ") : "Not specified"}

Output format:
- Weekly roadmap (with topics & tasks)
- Recommended resources
- Final outcome (what skills they will have mastered).
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent(prompt);

    // Safely extract response
    const responseText =
      result?.response?.text?.() ||
      result?.response?.candidates?.[0]?.content?.parts?.map(p => p.text).join("\n") ||
      null;

    if (!responseText) {
      throw new Error("Empty response from Gemini API");
    }

    return responseText;
  } catch (err) {
    // Check if it's a quota (429) error
    if (err?.status === 429 && retryCount < 3) {
      const retryAfter =
        err?.errorDetails?.[0]?.retryDelay?.seconds * 1000 || 40000; // default 40s
      console.warn(
        `⚠️ Quota hit (429). Retrying in ${retryAfter / 1000}s... [Attempt ${retryCount + 1}]`
      );
      await sleep(retryAfter);
      return generateLLMRoadmap(
        { role, timeline, hoursOfStudy, marksObtained, skillsHave, skillsLack },
        retryCount + 1
      );
    }

    console.error("❌ LLM Error in generateLLMRoadmap:", err?.response?.error || err);
    return "Roadmap generation failed. Please try again later.";
  }
}

module.exports = { generateLLMRoadmap };
