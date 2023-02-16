import { Configuration, OpenAIApi } from "openai"
import dotenv from "dotenv"

dotenv.config()

console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)
export async function GenerateMessage(question: string) {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: question,
            max_tokens: 7,
            temperature: 0.6,
        })
        var answer = ""
        var j = completion.data.choices.length
        for (var i = 0; i < j; i++) {
            console.log(completion.data.choices[i].text)
            answer = answer.concat("", completion.data.choices[i].text!)
        }
        return answer
    } catch (err) {
        console.log(err)
        return "erorr"
    }
}
