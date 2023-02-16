import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

console.log(process.env.OPENAI_API_KEY)
// const prompt = "Hello, world!"
// const maxTokens = 16
// const url = "https://api.openai.com/v1/engines/davinci-codex/completions"
// const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
// }
// const data = JSON.stringify({
//     prompt: prompt,
//     max_tokens: maxTokens,
// })
// axios
//     .post(url, data, { headers })
//     .then((response) => {
//         console.log("looks correct")
//         console.log(response.data.choices[0].text)
//     })
//     .catch((error) => {
//         console.error(error)
//     })
