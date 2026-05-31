import { reconcileOnu } from '../modules/onu/reconciliation/onu-reconcile.service'

async function main() {
  const result =
    await reconcileOnu( 'cmpqo7et50002g1ysz48aho02' )
  console.log(result)
}

main()