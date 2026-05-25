import { Olt }
  from '@prisma/client'

import { connectionManager }
  from './connection.manager'

import { HisfocusAdapter }
  from '../vendors/hisfocus/hisfocus.adapter'

export class NetworkFactory {
  static async create(
    olt: Olt
  ) {
    const transport =
      await connectionManager
        .getConnection(olt)

    switch (
      olt.vendor?.toUpperCase()
    ) {

      case 'HISFOCUS':

        return new HisfocusAdapter(
          transport
        )

      default:
        throw new Error(
          'UNSUPPORTED_VENDOR'
        )
    }
  }
}