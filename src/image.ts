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
            size: "256x256",
            response_format: "b64_json",
        })
        var base64data = response.data.data[0].b64_json!
        var utf8data = Buffer.from(
            response.data.data[0].b64_json!,
            "base64"
        ).toString("utf8")
        await fs.writeFile(
            "./public/base64.jpg",
            base64data,
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

        await fs.writeFile(
            "./public/utf8.jpg",
            utf8data,
            {
                encoding: "utf8",
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
