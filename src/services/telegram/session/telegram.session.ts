import { EndpointType } from "@prisma/client"

type AuthorizeStep =
  | 'NAME'
  | 'ADDRESS'
  | 'TYPE'
  | 'CONFIRM'


interface TelegramSession {

  action: 'AUTHORIZE_ONU'

  step: AuthorizeStep

  data: {
    macAddress?: string
    name?: string
    address?: string
    type?: EndpointType
  }
}


const sessions =
  new Map<
    string,
    TelegramSession
  >()


export const TelegramSessionStore = {

  set(
    chatId: string,
    data: TelegramSession
  ) {

    sessions.set(
      chatId,
      data
    )
  },


  get(
    chatId: string
  ) {

    return sessions.get(
      chatId
    )
  },


  delete(
    chatId: string
  ) {

    sessions.delete(
      chatId
    )
  }
}