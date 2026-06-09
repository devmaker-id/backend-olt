import Swal from 'sweetalert2'

import {
  useNavigate,
} from 'react-router-dom'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  PageContainer,
} from '@/shared/components/page-container'

import {
  PageHeader,
} from '@/shared/components/page-header'

import {
  OltForm,
} from '../components/olt-form'

import {
  useCreateOlt,
} from '../hooks/use-create-olt'

export function OltCreatePage() {
  const navigate =
    useNavigate()

  const createMutation =
    useCreateOlt()

  async function handleSubmit(
    values: any
  ) {
    try {
      await createMutation
        .mutateAsync(values)

      await Swal.fire({
        icon: 'success',
        title:
          'OLT berhasil dibuat',
      })

      navigate('/olts')

    } catch (error: any) {

      await Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text:
          error?.response?.data
            ?.message,
      })
    }
  }

  return (
    <PageContainer>
      <PageHeader
        title="Create OLT"
        description="Register a new OLT."
      />

      <Card>
        <CardHeader>
          <CardTitle>
            OLT Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <OltForm
            onSubmit={
              handleSubmit
            }
            isLoading={
              createMutation.isPending
            }
            submitLabel="Create OLT"
          />
        </CardContent>
      </Card>
    </PageContainer>
  )
}