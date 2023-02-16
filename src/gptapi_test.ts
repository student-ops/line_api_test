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
            max_tokens: 300,
            temperature: 0.6,
        })
        var answer = ""
        if (completion.data.choices[0].text != undefined) {
            answer = completion.data.choices[0].text
            console.log(answer)
            return answer
        }
    } catch (err) {
        console.log(err)
        return "erorr"
    }
}