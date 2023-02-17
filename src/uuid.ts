import fs from "fs"
import { v4 as uuidv4 } from "uuid"

const filename = "uuidr.txt"

export function generateAndStoreUUID(): string {
    let uuid: string

    try {
        // Read the previous UUID from the file and parse it
        const data = fs.readFileSync(filename, "utf-8")
        uuid = data.trim()
        const previousUUID = BigInt(`0x${uuid.replace(/-/g, "")}`)

        // Increment the previous UUID and convert it to a string
        const newUUID = (previousUUID + BigInt(1))
            .toString(16)
            .padStart(32, "0")
        uuid = `${newUUID.substr(0, 8)}-${newUUID.substr(
            8,
            4
        )}-${newUUID.substr(12, 4)}-${newUUID.substr(16, 4)}-${newUUID.substr(
            20
        )}`
    } catch (error) {
        // If the file doesn't exist or is empty, generate a new UUID
        uuid = uuidv4()
    }

    // Write the new UUID to the file
    fs.writeFileSync(filename, uuid, "utf-8")

    return uuid
}

var a = generateAndStoreUUID()
console.log(a)
