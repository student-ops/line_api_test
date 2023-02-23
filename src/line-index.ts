import express from "express"
import * as dotenv from "dotenv"
import * as axios from "axios"
import * as line from "@line/bot-sdk"
import { GenerateMessage } from "./gptapi"
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
    console.log("target: " + target!)
    // check group or not

    if (event.message.text.indexOf("ジピ") === 0) {
        const question = event.message.text.slice(2)
        await GptNormalflow(target!, event.replyToken, question)
    }

    return client.replyMessage(event.replyToken, {
        type: "text",
        text: event.message.text,
    })
}
async function GptNormalflow(
    target: string,
    replyToken: string,
    question: string
) {
    console.log("-------------------------------------")
    console.log(question + " " + target! + " " + replyToken)
    console.log("-------------------------------------")
    let interval: NodeJS.Timeout
    client.pushMessage(target!, {
        type: "text",
        text: "generating🍏🍇",
    })
    interval = setInterval(() => {
        client.pushMessage(target!, {
            type: "text",
            text: "generating🍏🍇",
        })
    }, 4000)
    const answer = await GenerateMessage(question, target!)
    client.replyMessage(replyToken, {
        type: "text",
        text: answer,
    })
    clearInterval(interval)
    return
}

console.log("line api sdk in line-index.ts")
console.log("app litening on port" + web_port)
app.listen(web_port)
