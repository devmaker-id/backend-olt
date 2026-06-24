import { env } from '../../config/env'
import { TelegramBot } from '@prisma/client'
import { TelegramMessage } from './telegram.types'

import { TelegramCommands } from './telegram.commands'
import { handleInetCommand } from './commands/inet.command'
import { handleHelpCommand } from './commands/help.command'
import { handleOnuOfflineCommand } from './commands/onu-offline.command'
import { handleSignalCommand } from './commands/signal.command'
import { validateTelegramUser } from '../../modules/telegram/validation/telegram.validation'
import { handleSession } from './session/telegram-session.handler'
import { TelegramSessionStore } from './session/telegram.session'
import { handleAuthorizeCommand } from './commands/authorize.command'
import {
  createTelegramAccessLog
} from '../../modules/telegram-bot/telegram-bot.service'
import { TelegramWebhookDto } from '../../modules/telegram-bot/telegram-bot.types'

export class TelegramService {
  static async processTelegramUpdate(
    bot: TelegramBot,
    update: TelegramWebhookDto
  ){
      try {
        const telegramId = String(update.message?.from?.id)
        const chatId = String(update.message?.chat?.id)
        const text = update.message?.text
        const telegramUser = await validateTelegramUser(telegramId)

        await createTelegramAccessLog(
          update,
          !!telegramUser,
          bot.id
        )
        
        if (!telegramUser) {
          console.log(
            '[UNAUTHORIZED TELEGRAM USER]',
            telegramId
          )
          return
        }

        if (!text) {
          return
        }

        const role = telegramUser.role
        const args = text.split(' ')
        const command = args[0]
        
        console.log(
          '[TELEGRAM COMMAND]',
          command
        )

        const session = TelegramSessionStore.get(
            chatId
          )


        if ( session ) {

          await handleSession(
            update,
            session
          )

          return {
            ok:true
          }
        }

        switch(command) {

          case TelegramCommands.help:
            await handleHelpCommand(
              update,
              role
            )
            break
          case TelegramCommands.inet:
            await handleInetCommand(
              update
            )
            break
          case TelegramCommands.signal:
            await handleSignalCommand(
              update
            )
            break
          case TelegramCommands.onuOffline:
            await handleOnuOfflineCommand(
              update
            )
            break
          
          case TelegramCommands.authorize:
            await handleAuthorizeCommand(
              update, role
            )
            break

          default:
            console.log(
              '[UNKNOWN COMMAND]',
              command
            )
        }

        return {
          ok: true
        }
      }

      catch(error) {

        console.log(
          '[TELEGRAM WEBHOOK ERROR]'
        )

        console.log(error)

        return {
          ok: true
        }
      }
  }

  static async sendMessage( message: TelegramMessage ) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type':
          'application/json'
        },
        body: JSON.stringify({
          chat_id: message.chatId,
          text: message.text,
          parse_mode: 'HTML',
          reply_to_message_id: message.replyToMessageId
        })
      })
      if (!response.ok) {
        const error = await response.text()
        console.log( 'TELEGRAM SEND FAILED' )
        console.log(error)
        return null
      }
      console.log( 'TELEGRAM SENT' )
      return await response.json()
    }
    catch(error) { 
      console.log( 'TELEGRAM ERROR' )
      console.log(error)
      return null
    }
  }

  static async editMessage(
    data: {
      chatId: string | number
      messageId: number
      text: string
    }
  ) {

    try {
      const response =
      await fetch(
        `https://api.telegram.org/bot${env.telegramBotToken}/editMessageText`, {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json'
          },
          body:
            JSON.stringify({
              chat_id: data.chatId,
              message_id: data.messageId,
              text: data.text,
              parse_mode: 'HTML'
            })
        }
      )
      if(!response.ok) {
        console.log(
          await response.text()
        )
        return null
      }
      return await response.json()
    } catch (error) {
      console.log( 'TELEGRAM EDIT ERROR' )
      console.log(error)
      return null
    }
  }

}