import {
  useEffect,
  useMemo,
  useState
} from 'react'

import {
  Link
} from 'react-router-dom'

import {
  Plus
} from 'lucide-react'

import {
  Button
} from '@/components/ui/button'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import {
  LoadingState
} from '@/shared/components/loading-state'

import {
  ErrorState
} from '@/shared/components/error-state'

import {
  EmptyState
} from '@/shared/components/empty-state'

import {
  PageContainer
} from '@/shared/components/page-container'

import {
  PageHeader
} from '@/shared/components/page-header'

import {
  DataTableToolbar
} from '@/shared/components/data-table-toolbar'

import {
  SearchInput
} from '@/shared/components/data-table/search-input'

import {
  DataTablePagination
} from '@/shared/components/data-table/data-table-pagination'

import {
  EndpointTable
} from '../components/endpoint-table'

import {
  useEndpoints
} from '../hooks/use-endpoints'

import type {
  Endpoint
} from '../types/endpoint.types'

export function EndpointListPage() {

  const {
    data = [],
    isLoading,
    error
  } = useEndpoints()

  const [search, setSearch] =
    useState('')

  const [page, setPage] =
    useState(1)

  const [perPage, setPerPage] =
    useState(10)

  useEffect(() => {

    setPage(1)

  }, [search])

  const filteredData =
    useMemo(() => {

      const keyword =
        search
          .trim()
          .toLowerCase()

      if (!keyword) {
        return data
      }

      return data.filter(
        (
          endpoint: Endpoint
        ) =>

          endpoint.internetNo
            ?.toLowerCase()
            .includes(keyword)

          ||

          endpoint.name
            ?.toLowerCase()
            .includes(keyword)

          ||

          endpoint.address
            ?.toLowerCase()
            .includes(keyword)
      )

    }, [
      data,
      search
    ])

  const totalPages =
    Math.max(

      1,

      Math.ceil(
        filteredData.length /
        perPage
      )
    )

  const paginatedData =
    useMemo(() => {

      const start =
        (page - 1) *
        perPage

      const end =
        start +
        perPage

      return filteredData.slice(
        start,
        end
      )

    }, [

      filteredData,

      page,

      perPage
    ])

  if (isLoading) {
    return (
      <LoadingState />
    )
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to load endpoint list."
      />
    )
  }

  if (
    !data ||
    data.length === 0
  ) {
    return (
      <EmptyState
        title="No Endpoint Found"
        description="Customer endpoint management"
      />
    )
  }

  return (

    <PageContainer>

      <PageHeader
        title="Endpoint List"
        description={
          `${filteredData.length} endpoint(s)`
        }
      />

      <DataTableToolbar
        search={
          <SearchInput
            value={search}
            placeholder="Search internet no, name or address..."
            onChange={
              setSearch
            }
          />
        }
        actions={

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Button
              asChild
            >

              <Link
                to="/endpoints/create"
              >

                <Plus
                  className="
                    mr-2
                    h-4
                    w-4
                  "
                />

                Create Endpoint

              </Link>

            </Button>

            <Select

              value={String(perPage)}

              onValueChange={(
                value
              ) => {

                setPerPage(
                  Number(value)
                )

                setPage(1)
              }}
            >

              <SelectTrigger
                className="
                  w-32
                "
              >

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem
                  value="10"
                >
                  10 Rows
                </SelectItem>

                <SelectItem
                  value="25"
                >
                  25 Rows
                </SelectItem>

                <SelectItem
                  value="50"
                >
                  50 Rows
                </SelectItem>

                <SelectItem
                  value="100"
                >
                  100 Rows
                </SelectItem>

              </SelectContent>

            </Select>

          </div>
        }
      />

      <EndpointTable
        data={paginatedData}
      />

      <DataTablePagination

        page={page}

        totalPages={
          totalPages
        }

        onPageChange={
          setPage
        }
      />

    </PageContainer>
  )
}