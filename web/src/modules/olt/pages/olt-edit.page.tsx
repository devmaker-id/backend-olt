import Swal from 'sweetalert2'

import {
  useParams,
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
  LoadingState,
} from '@/shared/components/loading-state'

import {
  ErrorState,
} from '@/shared/components/error-state'

import {
  OltForm,
} from '../components/olt-form'

import {
  useOlt,
} from '../hooks/use-olt'

import {
  useUpdateOlt,
} from '../hooks/use-update-olt'

export function OltEditPage() {
  const { id } =
    useParams()

  const navigate =
    useNavigate()

  const {
    data,
    isLoading,
    error,
  } = useOlt(id!)

  const updateMutation =
    useUpdateOlt()

  async function handleSubmit(
    values: any
  ) {
    try {

      await updateMutation
        .mutateAsync({
          id,
          data: values,
        })

      await Swal.fire({
        icon: 'success',
        title:
          'OLT berhasil diupdate',
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

  if (isLoading) {
    return (
      <LoadingState />
    )
  }

  if (error || !data) {
    return (
      <ErrorState
        message="OLT tidak ditemukan"
      />
    )
  }

  return (
    <PageContainer>
      <PageHeader
        title="Edit OLT"
        description="Update OLT configuration."
      />

      <Card>
        <CardHeader>
          <CardTitle>
            OLT Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <OltForm
            initialValues={data}
            onSubmit={
              handleSubmit
            }
            isLoading={
              updateMutation.isPending
            }
            submitLabel="Update OLT"
          />
        </CardContent>
      </Card>
    </PageContainer>
  )
}