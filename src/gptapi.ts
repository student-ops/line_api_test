import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function GenerateMessage(question: string) {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: question,
            temperature: 0.6,
        })
        var answer = ""
        var j = completion.data.choices.length
        console.log(j)
        for (var i = 0; i < j; i++) {
            console.log(completion.data.choices[i].text)
            answer = answer.concat("", completion.data.choices[i].text!)
        }
        return answer
    } catch (err) {
        return "erorr"
    }
}
