import { reconcileOlt } from '../../modules/onu/reconciliation/onu-reconcile.service'

async function main() {

  const result = await reconcileOlt(
      'cmpkutl6y0000g1qfqww5pk0e'
    )

  console.log(result)
}

main()