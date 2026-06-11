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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  useAuthorizeOnu,
} from '../hooks/use-authorize-onu'

import type {
  UnauthorizedOnu,
} from '../types/onu.types'

import type {
  EndpointType,
} from '@/modules/endpoint/types/endpoint.types'

interface AuthorizeOnuDialogProps {
  onu: UnauthorizedOnu | null

  open: boolean

  onOpenChange: (
    open: boolean
  ) => void
}

const endpointLabels: Record<
  EndpointType,
  string
> = {
  CUSTOMER: 'Customer',
  RESELLER: 'Reseller',
  POP: 'POP Site',
  BACKHAUL: 'Backhaul',
}

export function AuthorizeOnuDialog({
  onu,
  open,
  onOpenChange,
}: AuthorizeOnuDialogProps) {

  const authorizeMutation =
    useAuthorizeOnu()

  const [
    endpointType,
    setEndpointType,
  ] = useState<EndpointType>(
    'CUSTOMER',
  )

  const [
    endpointName,
    setEndpointName,
  ] = useState('')

  const [
    address,
    setAddress,
  ] = useState('')

  useEffect(() => {

    if (!onu) {
      return
    }

    setEndpointType(
      'CUSTOMER',
    )

    setEndpointName(
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
          endpointType,

        name:
          endpointName,

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
            Authorize discovered ONU
            and assign it to an endpoint.
          </DialogDescription>

        </DialogHeader>

        <div
          className="
            grid
            gap-2
            rounded-lg
            border
            p-4
            text-sm
            md:grid-cols-2
          "
        >

          <div>

            <span className="font-medium">
              ONU ID:
            </span>

            {' '}

            {onu.onuId}

          </div>

          <div>

            <span className="font-medium">
              ONU Name:
            </span>

            {' '}

            {onu.onuName || '-'}

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

        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <div className="space-y-2">

            <Label>
              Endpoint Type
            </Label>

            <Select
              value={
                endpointType
              }
              onValueChange={(
                value,
              ) =>
                setEndpointType(
                  value as EndpointType,
                )
              }
            >

              <SelectTrigger>

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem
                  value="CUSTOMER"
                >
                  Customer
                </SelectItem>

                <SelectItem
                  value="RESELLER"
                >
                  Reseller
                </SelectItem>

                <SelectItem
                  value="POP"
                >
                  POP Site
                </SelectItem>

                <SelectItem
                  value="BACKHAUL"
                >
                  Backhaul Link
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <div className="space-y-2">

            <Label>
              {
                endpointLabels[
                  endpointType
                ]
              }
              {' '}
              Name
            </Label>

            <Input
              value={
                endpointName
              }
              onChange={event =>
                setEndpointName(
                  event.target.value,
                )
              }
              placeholder={
                `${endpointLabels[
                  endpointType
                ]} Name`
              }
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
              placeholder="Address"
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