export function extractTelegramMessage(update: any) {
  const message = update.message
  if (!message) {
    return null
  }
  if (message.text) {
    return message.text
  }
  if (message.photo) {
    return '[PHOTO]'
  }
  if (message.document) {
    return '[DOCUMENT]'
  }
  if (message.sticker) {
    return '[STICKER]'
  }
  if (message.video) {
    return '[VIDEO]'
  }
  if (message.voice) {
    return '[VOICE]'
  }
  return '[UNKNOWN]'
}