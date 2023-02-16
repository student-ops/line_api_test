import express from "express"
import { Request, Response } from "express"
import axios from "axios"
import * as dotenv from "dotenv"
import { GenerateMessage } from "./gptapi"

interface WebhookRequest {
    destination: string
    events: EventRequest[]
}

interface EventRequest {
    type: string
    message: MessageRequest
    replyToken: string
    source: SourceRequest
}

interface MessageRequest {
    id: string
    text: string
    type: string
}

interface SourceRequest {
    type: string
    userId: string
}

dotenv.config()
const app = express()
app.use(express.json())

app.post("/", async (req: Request, res: Response) => {
    const body = req.body

    if (!body) {
        res.sendStatus(400)
        return
    }

    try {
        const webhookRequest: WebhookRequest = body
        for (const event of webhookRequest.events) {
            const replyToken = event.replyToken
            const messageText = event.message.text
            try {
                var answer: string = await GenerateMessage(messageText)
                sendMessage(replyToken, answer)
            } catch (err) {
                sendMessage(replyToken, "error happen generat text")
                sendMessage(replyToken, "error happen  generate text")
            }
        }
        res.sendStatus(200)
    } catch (err) {
        console.error(`Error decoding request body: ${err}`)
        res.sendStatus(400)
    }
})

const webport = 80
app.listen(webport, () => {
    console.log(`Server started listening on port ${webport}`)
})

const CHANNEL_ACCESS_TOKEN = process.env.ChannelAccessToken
async function sendMessage(replyToken: string, message: string) {
    const url = "https://api.line.me/v2/bot/message/reply"
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    }

    const payload = {
        replyToken: replyToken,
        messages: [
            {
                type: "text",
                text: "replying message",
            },
            {
                type: "text",
                text: message,
            },
        ],
    }

    try {
        const response = await axios.post(url, payload, { headers })
        console.log("Response:", response.status)
    } catch (error) {
        console.error("Error sending message:", error)
    }
}
