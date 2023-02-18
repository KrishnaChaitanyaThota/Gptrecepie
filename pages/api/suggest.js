const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getSuggestions(prompt){ 

const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
    max_tokens: 3000,

  })
const choices = response.data.choices
console.log(response.data)
// var res = JSON.parse(choices)
return choices
}

export default async function handler(req, res){
    const {Ingredients} = req.body;
    const prompt = `give the list of 10 recipes that can be made with ${Ingredients}`;

    var choices = await getSuggestions(prompt);
    return res.status(200).json({data: choices});
}

