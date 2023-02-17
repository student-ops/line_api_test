import { Configuration, OpenAIApi } from "openai"
import dotenv from "dotenv"

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)
export async function GenerateMessage(question: string, uuid) {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: question,
            max_tokens: 300,
            temperature: 0.6,
            best_of: 4,
            user: uuid,
        })
        var answer = ""
        if (completion.data.choices[0].text != undefined) {
            answer = completion.data.choices[0].text.replace(/^\s+/, "")
            console.log(answer)
            return answer
        } else {
            return answer
        }
    } catch (err) {
        console.log(err)
        return "erorr"
    }
}
