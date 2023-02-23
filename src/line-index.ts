import express from "express"
import dotenv from "dotenv"
import axios from "axios"
import line from "@line/bot-sdk"
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

function handleEvent(event: line.WebhookEvent) {
    if (event.type !== "message" || event.message.type !== "text") {
        return Promise.resolve(null)
    }

    return client.replyMessage(event.replyToken, {
        type: "text",
        text: event.message.text,
    })
}

console.log("app litening on port" + web_port)
app.listen(web_port)
