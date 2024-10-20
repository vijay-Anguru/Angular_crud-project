import {MessageType} from "../app.enum"
export interface iApiResponse {
    Data: any
    MessageType: MessageType,
    Message: string,
    Result: any,
    Total: number
}