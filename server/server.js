const express = require('express');
const app = express();
const cors = require('cors')
const {Configuration, OpenAIApi} = require('openai');
const Port = 5000;
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json())

console.log(process.env.OPENAI_API_KEY);

//configuration Open Ai api key 
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,

});
const openai = new OpenAIApi(configuration);

//get router 
app.get('/',(req,res)=>{
    res.status(200).send({
        message: "Hello from CodeAI",
    })
});

//get all the data fatch 
app.post('/',async (req,res)=>{
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        res.status(200).send({
            bot: response.data.choices[0].text
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error || "Something Went Wrong")
        
    }

});

app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
})


