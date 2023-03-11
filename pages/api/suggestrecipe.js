const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getrecipeSuggestions(recipeprompt) {

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: recipeprompt,
    max_tokens: 3000,
    temperature:0.7,

  });
  return response.data.choices;
}

export default async function handler(req, res) {
  try {
    const { Ingredients } = req.body;
    const recipeprompt = `Give the recipe of making the dish in one paragraph by using only the mentioned ingredients : ${Ingredients}`;

    var choices = await getrecipeSuggestions(recipeprompt);
    return res.status(200).json({ data: choices });
  }
  catch (e) {
    console.log(e.message);
  }
}
