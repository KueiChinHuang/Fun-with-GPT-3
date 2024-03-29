import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-curie-001", {
    prompt: req.body.input,
    temperature: 0.6,
    max_tokens: 200
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}