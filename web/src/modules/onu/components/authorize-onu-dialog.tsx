import { useEffect } from 'react'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Button,
} from '@/components/ui/button'

import {
  Input,
} from '@/components/ui/input'

import {
  Label,
} from '@/components/ui/label'

import {
  useAuthorizeOnu,
} from '../hooks/use-authorize-onu'

import type {
  UnauthorizedOnu,
} from '../types/onu.types'

interface AuthorizeOnuDialogProps {
  onu: UnauthorizedOnu | null

  open: boolean

  onOpenChange: (
    open: boolean
  ) => void
}

export function AuthorizeOnuDialog({
  onu,
  open,
  onOpenChange,
}: AuthorizeOnuDialogProps) {

  const authorizeMutation =
    useAuthorizeOnu()

  const [
    customerName,
    setCustomerName,
  ] = useState('')

  const [
    address,
    setAddress,
  ] = useState('')

  useEffect(() => {

    if (!onu) {
      return
    }

    setCustomerName(
      onu.onuName ||
      `ONU-${onu.onuId}`,
    )

    setAddress('')

  }, [onu])

  async function handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault()

    if (!onu) {
      return
    }

    await authorizeMutation.mutateAsync({

      macAddress:
        onu.macAddress,

      endpoint: {

        type:
          'CUSTOMER',

        name:
          customerName,

        address,

      },

    })

    onOpenChange(false)
  }

  if (!onu) {
    return null
  }

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Authorize ONU
          </DialogTitle>

          <DialogDescription>
            Register unauthorized ONU as customer endpoint.
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-2 rounded-lg border p-4 text-sm">

          <div>
            <span className="font-medium">
              ONU ID:
            </span>
            {' '}
            {onu.onuId}
          </div>

          <div>
            <span className="font-medium">
              MAC Address:
            </span>
            {' '}
            {onu.macAddress}
          </div>

          <div>
            <span className="font-medium">
              EPON Port:
            </span>
            {' '}
            {onu.eponPort}
          </div>

          <div>
            <span className="font-medium">
              ONU Name:
            </span>
            {' '}
            {onu.onuName || '-'}
          </div>

        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <div className="space-y-2">

            <Label>
              Customer Name
            </Label>

            <Input
              value={
                customerName
              }
              onChange={event =>
                setCustomerName(
                  event.target.value,
                )
              }
              placeholder="
                Customer Name
              "
              required
            />

          </div>

          <div className="space-y-2">

            <Label>
              Address
            </Label>

            <Input
              value={address}
              onChange={event =>
                setAddress(
                  event.target.value,
                )
              }
              placeholder="
                Customer Address
              "
              required
            />

          </div>

          <DialogFooter>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onOpenChange(
                  false,
                )
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                authorizeMutation.isPending
              }
            >
              {
                authorizeMutation.isPending
                  ? 'Authorizing...'
                  : 'Authorize ONU'
              }
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>
  )
}