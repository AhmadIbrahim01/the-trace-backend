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
  Please analyze the following statement and provide a detailed breakdown:
  
  1. Sentiment Analysis
     - Overall emotional tone (positive, negative, neutral)
     - Emotional intensity (scale 1-5)
     - Detected emotions (e.g., joy, anger, fear)
     - Contextual mood indicators
  
  2. Key Elements
     - People: Names, roles, relationships
     - Places: Locations, settings, environments
     - Objects: Physical items, concepts, abstract references
     - Time indicators: Dates, periods, temporal references
  
  3. Language Analysis
     - Key themes and topics
     - Notable phrases or expressions
     - Writing style (formal, casual, technical)
     - Tone indicators (sarcasm, humor, seriousness)
  
  4. Critical Evaluation
     - Internal inconsistencies or contradictions
     - Potential ambiguities
     - Missing context or information gaps
     - Logical flow assessment
  
  5. Additional Context
     - Cultural or social references
     - Industry-specific terminology
     - Relevant background information
  
  Statement: "${statement}"
  
  Please provide your analysis in a clear, structured format with specific examples and supporting evidence from the text.
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
