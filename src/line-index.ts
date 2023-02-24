import express from "express"
import * as dotenv from "dotenv"
import * as axios from "axios"
import * as line from "@line/bot-sdk"
import { GenerateMessage } from "./gptapi"
import { GenerateImg } from "./dalle-api"
import { appendFile } from "fs"

dotenv.config()
const a = process.env.CHANNEL_ACCESS_TOKEN
const c = process.env.CHANNEL_SECRET
const web_port = process.env.WEB_PORT || 3000
if (a === undefined || c === undefined) {
    throw new Error("Channel access token or channel secret is not defined")
}
const config = {
    channelAccessToken: a,
    channelSecret: c,
}
const client = new line.Client(config)
const app = express()
app.post("/webhook", line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(handleEvent)).then((result) =>
        res.json(result)
    )
})

async function handleEvent(event: line.WebhookEvent) {
    if (event.type !== "message" || event.message.type !== "text") {
        return Promise.resolve(null)
    }
    var target: string
    if (event.source.type == "user") target = event.source.userId
    if (event.source.type == "group") target = event.source.groupId!
    // console.log("target: " + target!)
    // check group or not

    if (event.message.text.indexOf("ジピ") === 0) {
        const question = event.message.text.slice(2)
        await GptNormalflow(target!, event.replyToken, question, "gpt")
        return
    }
    if (event.message.text.indexOf("ダリ") === 0) {
        const question = event.message.text.slice(2)
        await GptNormalflow(target!, event.replyToken, question, "dalle")
        return
    }
    if (event.message.text === "ping") {
        client.replyMessage(event.replyToken, {
            type: "text",
            text: "pong",
        })
        return
    }
    return
}

async function GptNormalflow(
    target: string,
    replyToken: string,
    question: string,
    ai: string
) {
    let interval: NodeJS.Timeout
    try {
        await client.pushMessage(target!, {
            type: "text",
            text: "generating🍏🍇",
        })
        interval = setInterval(async () => {
            await client.pushMessage(target!, {
                type: "text",
                text: "generating🍏🍇",
            })
        }, 4000)
        if (ai == "gpt") {
            const answer = await GenerateMessage(question, target!)
            console.log("-------------------------------------")
            console.log(question + " " + target! + " " + replyToken)
            console.log("answer: " + answer)
            console.log("-------------------------------------")

            await client.replyMessage(replyToken, {
                type: "text",
                text: answer,
            })
        }
        if (ai == "dalle") {
            const answer = "generate"
            GenerateImg(question)
            await client.replyMessage(replyToken, {
                type: "text",
                text: answer,
            })
        }
    } catch (err) {
        console.error(err)
    } finally {
        clearInterval(interval!)
    }
    return
}

console.log("line api sdk in line-index.ts")
console.log("app litening on port" + web_port)
app.listen(web_port)
