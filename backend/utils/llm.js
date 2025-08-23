// backend/utils/llm.js
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function generateLLMRoadmap({
  role,
  timeline,
  hoursOfStudy,
  marksObtained,
  skillsHave = [],
  skillsLack = []
}) {
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

    const response = await fetch(`${process.env.OPENAI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    console.log("🔍 OpenRouter raw response:", data);

    if (data.error) {
      console.error("❌ OpenRouter API Error:", data.error);
      return "Roadmap generation failed. Please try again later.";
    }

    return data.choices?.[0]?.message?.content || "Roadmap generation failed.";
  } catch (err) {
    console.error("❌ LLM Error:", err);
    return "Roadmap generation failed. Please try again later.";
  }
}

module.exports = { generateLLMRoadmap };
