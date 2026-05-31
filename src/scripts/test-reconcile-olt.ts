import { reconcileOlt } from '../modules/onu/reconciliation/onu-reconcile.service'

async function main() {

  const result =
    await reconcileOlt(
      'cmpjspt4d0000g19839kspwrt'
    )

  console.log(result)
}

main()