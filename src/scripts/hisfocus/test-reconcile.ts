import { reconcileOnu } from '../../modules/onu/reconciliation/onu-reconcile.service'

async function main() {
    try {
        const result = await reconcileOnu( 'cmpqo7et50002g1ysz48aho02' )
        console.log(result)
    } catch (error) {
        console.error(
            'ERROR',
            error
        )
    }
  
}

main()