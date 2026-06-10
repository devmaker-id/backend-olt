import {
  useNavigate
} from 'react-router-dom'

import Swal from 'sweetalert2'

import {
  EndpointForm
} from '../components/endpoint-form'

import {
  useCreateEndpoint
} from '../hooks/use-create-endpoint'

import type {
  CreateEndpointDto
} from '../types/endpoint.types'
import { PageContainer } from '@/shared/components/page-container'
import { PageHeader } from '@/shared/components/page-header'

export function
EndpointCreatePage() {

  const navigate =
    useNavigate()

  const createMutation =
    useCreateEndpoint()

  async function handleSubmit(
    data: CreateEndpointDto
  ) {

    try {

      await createMutation.mutateAsync(
        data
      )

      await Swal.fire({

        icon: 'success',

        title:
          'Endpoint berhasil dibuat'
      })

      navigate(
        '/endpoints'
      )

    }

    catch(error: any) {

      await Swal.fire({

        icon: 'error',

        title:
          'Gagal',

        text:
          error?.response?.data?.message
            ||
          'Terjadi kesalahan'
      })
    }
  }

  return (
    <PageContainer>
      <PageHeader
        title="Buat pelanggan"
        description="Membuat endpoin atau pelanggan baru"
      />

      <EndpointForm

        isLoading={
          createMutation.isPending
        }

        onSubmit={
          handleSubmit
        }
      />
    </PageContainer>
  )
}