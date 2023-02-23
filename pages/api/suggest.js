const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getSuggestions(prompt) {

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 3000,
    temperature:0.7,
    // top_p:1,
    // frequency_penalty:0,
    // presence_penalty:0

  });
  return response.data.choices;
}

export default async function handler(req, res) {
  try {
    const { Ingredients } = req.body;
    const prompt = `give the list of 10 recipes that can be made with ${Ingredients}`;

    var choices = await getSuggestions(prompt);
    return res.status(200).json({ data: choices });
  }
  catch (e) {
    console.log(e);
  }
}
