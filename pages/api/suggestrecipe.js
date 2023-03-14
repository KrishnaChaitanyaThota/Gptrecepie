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

  });
  return response.data.choices;
}

export default async function handler(req, res) {
  try {
    const { recipe } = req.body;
    const prompt = `Give one recipe of ${recipe}`;

    var choices = await getSuggestions(prompt);
    return( res.status(200).json({ data: choices }));
  }
  catch (e) {
    console.log(e.message);
  }
}