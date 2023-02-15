import { Configuration, OpenAIApi } from "openai"
import axios from "axios"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function GenerateMessage(question: string, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message:
                    "OpenAI API key not configured, please follow instructions in README.md",
            },
        })
        return
    }

    const animal = req.body.animal || ""
    if (animal.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter a valid animal",
            },
        })
        return
    }

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(animal),
            temperature: 0.6,
        })
        var anserwer = "ansewer"
        var j = completion.data.choices.length
        console.log(j)
        for (var i = 0; i < j; i++) {
            console.log(completion.data.choices[i].text)
            anserwer = anserwer.concat("", completion.data.choices[i].text)
        }
        res.status(200).json({ result: anserwer })
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data)
            res.status(error.response.status).json(error.response.data)
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`)
            res.status(500).json({
                error: {
                    message: "An error occurred during your request.",
                },
            })
        }
    }
}

function generatePrompt(animal) {
    const capitalizedAnimal =
        animal[0].toUpperCase() + animal.slice(1).toLowerCase()
    return `${capitalizedAnimal}`
}
