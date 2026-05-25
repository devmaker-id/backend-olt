export interface TelegramMessage {
    chatId: string
    text: string
    parseMode?: 'Markdown'
}