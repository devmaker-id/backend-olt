import cron from 'node-cron'
import { env } from '../../../config/env'
import { prisma } from '../../../config/prisma'
import { reconcileOltWithSession } from './onu-reconcile.service'

let running = false

export function startOnuReconcileScheduler() {

  cron.schedule(
    env.schedulerCron,
    async () => {

      if (running) {

        console.log(
          'RECONCILE_ALREADY_RUNNING'
        )

        return
      }

      running = true

      try {

        console.log(
          'RECONCILE_START'
        )

        const olts =
          await prisma.olt.findMany()

        for (
          const olt of olts
        ) {

          const summary =
            await reconcileOltWithSession(
              olt.id
            )

          console.log(
            olt.name,
            summary
          )
        }

      } catch(error) {

        console.log(error)

      } finally {

        running = false

      }
    }
  )
}