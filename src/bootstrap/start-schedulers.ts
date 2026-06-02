import {
  startOnuReconcileScheduler
} from '../modules/onu/reconciliation/onu-reconcile.scheduler'

export function startSchedulers() {

  startOnuReconcileScheduler()

}