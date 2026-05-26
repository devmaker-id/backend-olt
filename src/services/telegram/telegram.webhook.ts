import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import {
  TelegramCommands
} from './telegram.commands'

import {
  handleInetCommand
} from './commands/inet.command'

import {
  handleHelpCommand
} from './commands/help.command'

import {
  handleOnuOfflineCommand
} from './commands/onu-offline.command'
import {
  handleSignalCommand
} from './commands/signal.command'
import { validateTelegramUser } from '../../modules/telegram/telegram.auth'

export async function telegramWebhook(

  request: FastifyRequest<{
    Body: any
  }>,

  reply: FastifyReply
) {

  try {

    const body: any = request.body

    const telegramId = body?.message?.from?.id ?.toString()

    const telegramUser =
      await validateTelegramUser(
        telegramId
      )

    if (!telegramUser) {

      console.log(

        '[UNAUTHORIZED TELEGRAM USER]',

        telegramId
      )

      return reply.send({
        ok: true
      })
    }

    console.log(

      '[TELEGRAM UPDATE]',

      JSON.stringify(
        body,
        null,
        2
      )
    )

    const text =
      body?.message?.text

    if (!text) {

      return reply.send({
        ok: true
      })
    }

    const args =
      text.split(' ')

    const command =
      args[0]
    
    console.log(

      '[TELEGRAM COMMAND]',

      command
    )

    switch(command) {

      case TelegramCommands.help:

        await handleHelpCommand(
          body
        )

        break

      case TelegramCommands.inet:

        await handleInetCommand(
          body
        )

        break
      case TelegramCommands.signal:

        await handleSignalCommand(
          body
        )

        break
      case TelegramCommands.onuOffline:

        await handleOnuOfflineCommand(
          body
        )
        break

      default:

        console.log(

          '[UNKNOWN COMMAND]',

          command
        )
    }

    return reply.send({
      ok: true
    })
  }

  catch(error) {

    console.log(
      '[TELEGRAM WEBHOOK ERROR]'
    )

    console.log(error)

    return reply.send({
      ok: true
    })
  }
}