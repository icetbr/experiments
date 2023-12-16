import { type } from "arktype"

export const user = type({
    name: "string"
    device: {
        platform: "'android'|'ios'",
        "version?": "number"
    }
})
