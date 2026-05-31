import { reconcileOltWithSession } from '../../modules/onu/reconciliation/onu-reconcile.service'

async function main() {

  const results =
    await reconcileOltWithSession(
      'cmpkutl6y0000g1qfqww5pk0e'
    )

  console.dir(
    results,
    {
      depth: null
    }
  )
}

main()