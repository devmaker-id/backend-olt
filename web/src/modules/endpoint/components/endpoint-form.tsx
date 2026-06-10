import {
  useState
} from 'react'

import {
  Button
} from '@/components/ui/button'

import {
  Input
} from '@/components/ui/input'

import {
  Label
} from '@/components/ui/label'

import {
  Textarea
} from '@/components/ui/textarea'

import {

  Select,

  SelectContent,

  SelectItem,

  SelectTrigger,

  SelectValue

} from '@/components/ui/select'

import type {

  CreateEndpointDto,

  EndpointType

} from '../types/endpoint.types'

interface EndpointFormProps {

  defaultValues?:
    Partial<CreateEndpointDto>

  isLoading?: boolean

  onSubmit: (
    data: CreateEndpointDto
  ) => void
}

export function EndpointForm({

  defaultValues,

  isLoading,

  onSubmit

}: EndpointFormProps) {

  const [form, setForm] =
    useState<CreateEndpointDto>({

      internetNo:
        defaultValues?.internetNo || '',

      type:
        defaultValues?.type ||
        'CUSTOMER',

      name:
        defaultValues?.name || '',

      code:
        defaultValues?.code || '',

      address:
        defaultValues?.address || '',

      latitude:
        defaultValues?.latitude,

      longitude:
        defaultValues?.longitude,

      description:
        defaultValues?.description || ''
    })

  function handleSubmit(
    event: React.FormEvent
  ) {

    event.preventDefault()

    onSubmit(form)
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div className="grid gap-4 md:grid-cols-2">

        <div className="space-y-2">

          <Label>
            Internet No
          </Label>

          <Input

            required

            value={form.internetNo}

            onChange={(event) =>
              setForm({

                ...form,

                internetNo:
                  event.target.value
              })
            }
          />

        </div>

        <div className="space-y-2">

          <Label>
            Name
          </Label>

          <Input

            required

            value={form.name}

            onChange={(event) =>
              setForm({

                ...form,

                name:
                  event.target.value
              })
            }
          />

        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div className="space-y-2">

          <Label>
            Type
          </Label>

          <Select

            value={form.type}

            onValueChange={(
              value
            ) =>
              setForm({

                ...form,

                type:
                  value as EndpointType
              })
            }
          >

            <SelectTrigger>

              <SelectValue />

            </SelectTrigger>

            <SelectContent>

              <SelectItem
                value="CUSTOMER"
              >
                CUSTOMER
              </SelectItem>

              <SelectItem
                value="RESELLER"
              >
                RESELLER
              </SelectItem>

              <SelectItem
                value="POP"
              >
                POP
              </SelectItem>

              <SelectItem
                value="BACKHAUL"
              >
                BACKHAUL
              </SelectItem>

            </SelectContent>

          </Select>

        </div>

        <div className="space-y-2">

          <Label>
            Code
          </Label>

          <Input

            value={
              form.code || ''
            }

            onChange={(event) =>
              setForm({

                ...form,

                code:
                  event.target.value
              })
            }
          />

        </div>

      </div>

      <div className="space-y-2">

        <Label>
          Address
        </Label>

        <Textarea

          rows={3}

          value={
            form.address || ''
          }

          onChange={(event) =>
            setForm({

              ...form,

              address:
                event.target.value
            })
          }
        />

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div className="space-y-2">

          <Label>
            Latitude
          </Label>

          <Input

            type="number"

            value={
              form.latitude ?? ''
            }

            onChange={(event) =>
              setForm({

                ...form,

                latitude:
                  event.target.value
                    ? Number(
                        event.target.value
                      )
                    : undefined
              })
            }
          />

        </div>

        <div className="space-y-2">

          <Label>
            Longitude
          </Label>

          <Input

            type="number"

            value={
              form.longitude ?? ''
            }

            onChange={(event) =>
              setForm({

                ...form,

                longitude:
                  event.target.value
                    ? Number(
                        event.target.value
                      )
                    : undefined
              })
            }
          />

        </div>

      </div>

      <div className="space-y-2">

        <Label>
          Description
        </Label>

        <Textarea

          rows={4}

          value={
            form.description || ''
          }

          onChange={(event) =>
            setForm({

              ...form,

              description:
                event.target.value
            })
          }
        />

      </div>

      <div className="flex justify-end">

        <Button
          type="submit"
          disabled={isLoading}
        >

          {
            isLoading
              ? 'Saving...'
              : 'Save Endpoint'
          }

        </Button>

      </div>

    </form>
  )
}