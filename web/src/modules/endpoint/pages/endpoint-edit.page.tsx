import {
  useNavigate,
  useParams
} from 'react-router-dom'

import Swal from 'sweetalert2'

import {
  ArrowLeft,
  Save
} from 'lucide-react'

import {
  Button
} from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import {
  EndpointForm
} from '../components/endpoint-form'

import {
  useEndpoint
} from '../hooks/use-endpoint'

import {
  useUpdateEndpoint
} from '../hooks/use-update-endpoint'

import type {
  CreateEndpointDto
} from '../types/endpoint.types'

export function
EndpointEditPage() {

  const { id } = useParams()

  const navigate =
    useNavigate()

  const updateMutation =
    useUpdateEndpoint()

  const {
    data,
    isLoading
  } = useEndpoint(
    id!
  )

  async function handleSubmit(
    form: CreateEndpointDto
  ) {

    try {

      await updateMutation.mutateAsync({

        id: id!,

        data: {

          type: form.type,

          name: form.name,

          code: form.code,

          address: form.address,

          latitude: form.latitude,

          longitude: form.longitude,

          description:
            form.description
        }
      })

      await Swal.fire({

        icon: 'success',

        title:
          'Endpoint updated',

        text:
          'Data berhasil diperbarui'
      })

      navigate(
        '/endpoints'
      )

    }

    catch(error: any) {

      await Swal.fire({

        icon: 'error',

        title:
          'Update gagal',

        text:
          error?.response?.data?.message ||
          'Terjadi kesalahan'
      })
    }
  }

  if (isLoading) {

    return (

      <div className="p-6">

        Loading...

      </div>
    )
  }

  return (

    <div className="space-y-6 p-6">

      <div className="flex items-center gap-2">

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            navigate(-1)
          }
        >

          <ArrowLeft
            className="h-4 w-4"
          />

        </Button>

        <h1
          className="text-2xl font-bold"
        >
          Edit Endpoint
        </h1>

      </div>

      <Card>

        <CardHeader>

          <CardTitle
            className="flex items-center gap-2"
          >

            <Save
              className="h-5 w-5"
            />

            Endpoint Information

          </CardTitle>

        </CardHeader>

        <CardContent>

          <EndpointForm

            defaultValues={{

              internetNo:
                data.internetNo,

              type:
                data.type,

              name:
                data.name,

              code:
                data.code,

              address:
                data.address,

              latitude:
                data.latitude,

              longitude:
                data.longitude,

              description:
                data.description
            }}

            isLoading={
              updateMutation.isPending
            }

            onSubmit={
              handleSubmit
            }
          />

        </CardContent>

      </Card>

    </div>
  )
}