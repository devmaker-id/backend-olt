export interface TelegramMessage {
    chatId: number | string,
    text: string
    replyToMessageId?: number
}