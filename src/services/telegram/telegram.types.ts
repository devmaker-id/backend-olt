export interface TelegramMessage {
    token?: string
    chatId: number | string,
    text: string
    replyToMessageId?: number
}