import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const analyzeStatement = async (req, res) => {
  const { statement } = req.body;

  if (
    !statement ||
    typeof statement !== "string" ||
    statement.trim().length === 0
  ) {
    return res.status(400).send({
      error: "Please provide a valid statement.",
    });
  }

  const prompt = `
    Analyze the following statement and provide a structured breakdown:
    - Sentiment Analysis: Identify the emotional tone of the statement.
    - Key Entities: Identify people, places, and objects mentioned.
    - Inconsistencies: Detect possible contradictions or mismatches.
  
    Statement: "${statement}"
    `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a suspect statement analysis expert.",
        },
        { role: "user", content: prompt },
      ],
    });

    const result = response.choices[0].message.content.trim();
    return res.status(200).send({
      result,
    });
  } catch (error) {
    console.error("Error in OpenAI API request:", error);
    return res.status(500).send({
      error:
        "There was an error processing your request. Please try again later.",
    });
  }
};
