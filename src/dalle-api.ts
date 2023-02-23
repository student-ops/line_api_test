import { Configuration, OpenAIApi } from "openai"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function GenerateImg(prompt: string) {
    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        })
        var imgedata = response.data.data[0].b64_json!.replace(
            "data:image/jpeg;base64,",
            ""
        )
        await fs.writeFile(
            "./public/dalle.jpg",
            imgedata,
            {
                encoding: "base64",
            },
            (err) => {
                if (err) {
                    console.log("error heapen in generate img")
                } else {
                    console.log("success")
                }
            }
        )
    } catch {
        console.log("error heapen in generate img")
    }
    return
}

GenerateImg("a dog")
