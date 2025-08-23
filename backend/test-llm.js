require("dotenv").config();
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args)); 
// 👆 This ensures fetch works in CommonJS

async function testLLM() {
  const prompt = `
You are an AI career mentor. Generate a very short roadmap for becoming a frontend developer in 2 months.
`;

  try {
    const response = await fetch(`${process.env.OPENAI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // you can swap to another model
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("❌ OpenRouter API Error:", data.error);
    } else {
      console.log("✅ LLM Output:\n", data.choices[0].message.content);
    }
  } catch (err) {
    console.error("❌ Request Error:", err);
  }
}

testLLM();
