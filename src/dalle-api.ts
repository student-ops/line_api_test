import { Configuration, OpenAIApi } from "openai"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function GenerateImg(prompt: string): Promise<string> {
    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "url",
        })
        console.log(response.data.data[0].url)
        return response.data.data[0].url!
        // var imgedata = response.data.data[0].b64_json!.replace(
        //     "data:image/jpeg;base64,",
        //     ""
        // )
        // await fs.writeFile(
        //     "./public/dalle.jpg",
        //     imgedata,
        //     {
        //         encoding: "base64",
        //     },
        //     (err) => {
        //         if (err) {
        //             console.log("err
        //             console.log("success")
        //         }
        //     }
        // )
    } catch {
        console.log("error heapen in generate img")
        return "error happen"
    }
}
