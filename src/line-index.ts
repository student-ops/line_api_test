import express from "express"
import * as dotenv from "dotenv"
import * as axios from "axios"
import * as line from "@line/bot-sdk"
import { GenerateMessage } from "./gptapi"
import { generateAndStoreUUID } from "./uuid"
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

const app = express()
app.post("/webhook", line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(handleEvent)).then((result) =>
        res.json(result)
    )
})
const client = new line.Client(config)

async function handleEvent(event: line.WebhookEvent) {
    if (event.type !== "message" || event.message.type !== "text") {
        return Promise.resolve(null)
    }
    if (event.message.text == "a") {
        return client.replyMessage(event.replyToken, {
            type: "text",
            text: "よるですよ",
        })
    }
    if (event.message.text.indexOf("ジピ") === 0) {
        const question = event.message.text.slice(4)
        var uuid = event.source.userId
        if (event.source.type == "group") {
            uuid = event.source.groupId!
        }
        const answer = await GenerateMessage(question, uuid!)
        console.log("uuid: " + uuid)
        client.pushMessage(uuid!, {
            type: "text",
            text: "hello",
        })
        return client.replyMessage(event.replyToken, {
            type: "text",
            text: answer,
        })
    }

    return client.replyMessage(event.replyToken, {
        type: "text",
        text: event.message.text,
    })
}

console.log("line api sdk in line-index.ts")
console.log("app litening on port" + web_port)
app.listen(web_port)
