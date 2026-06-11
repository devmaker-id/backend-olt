import { useMemo } from 'react'
import { useState } from 'react'

import {
  PageContainer,
} from '@/shared/components/page-container'

import {
  PageHeader,
} from '@/shared/components/page-header'

import {
  AuthorizeOnuDialog,
} from '../components/authorize-onu-dialog'

import {
  UnregisteredOnuPagination,
} from '../components/unregistered-onu-pagination'

import {
  UnregisteredOnuSummary,
} from '../components/unregistered-onu-summary'

import {
  UnregisteredOnuTable,
} from '../components/unregistered-onu-table'

import {
  UnregisteredOnuToolbar,
} from '../components/unregistered-onu-toolbar'

import {
  useUnauthorizedOnus,
} from '../hooks/use-unauthorized-onus'

import type {
  UnauthorizedOnu,
} from '../types/onu.types'

export function UnregisteredOnuPage() {

  const {
    data = [],
    isLoading,
  } = useUnauthorizedOnus()

  const [
    search,
    setSearch,
  ] = useState('')

  const [
    page,
    setPage,
  ] = useState(1)

  const [
    pageSize,
    setPageSize,
  ] = useState(10)

  const [
    selectedOnu,
    setSelectedOnu,
  ] = useState<UnauthorizedOnu | null>(
    null,
  )

  const filteredOnus =
    useMemo(() => {

      const keyword =
        search.toLowerCase()

      return data.filter(
        (
          onu: UnauthorizedOnu,
        ) => {

          return (
            onu.onuName
              ?.toLowerCase()
              .includes(
                keyword,
              ) ||

            onu.macAddress
              ?.toLowerCase()
              .includes(
                keyword,
              ) ||

            onu.onuId
              ?.toLowerCase()
              .includes(
                keyword,
              )
          )

        },
      )

    }, [
      data,
      search,
    ])

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredOnus.length /
        pageSize,
      ),
    )

  const paginatedOnus =
    filteredOnus.slice(
      (page - 1) * pageSize,
      page * pageSize,
    )

  return (
    <PageContainer>

      <PageHeader
        title="Unauthorized ONU"
        description="
          Manage ONU discovered from OLT and authorize them as customer endpoints.
        "
      />

      <UnregisteredOnuSummary
        total={
          filteredOnus.length
        }
      />

      <div
        className="
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        <UnregisteredOnuToolbar
          search={search}
          onSearchChange={(
            value,
          ) => {

            setSearch(
              value,
            )

            setPage(1)

          }}
        />

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <span
            className="
              text-sm
              text-muted-foreground
            "
          >
            Show
          </span>

          <select
            value={pageSize}
            onChange={event => {

              setPageSize(
                Number(
                  event.target.value,
                ),
              )

              setPage(1)

            }}
            className="
              h-9
              rounded-md
              border
              bg-background
              px-3
              text-sm
            "
          >

            <option value={10}>
              10
            </option>

            <option value={25}>
              25
            </option>

            <option value={50}>
              50
            </option>

            <option value={100}>
              100
            </option>

          </select>

        </div>

      </div>

      <UnregisteredOnuTable
        onus={
          paginatedOnus
        }
        isLoading={
          isLoading
        }
        onAuthorize={
          setSelectedOnu
        }
      />

      <UnregisteredOnuPagination
        page={page}
        totalPages={
          totalPages
        }
        onPrevious={() =>
          setPage(
            page - 1,
          )
        }
        onNext={() =>
          setPage(
            page + 1,
          )
        }
      />

      <AuthorizeOnuDialog
        onu={selectedOnu}
        open={
          Boolean(
            selectedOnu,
          )
        }
        onOpenChange={(
          open,
        ) => {

          if (!open) {

            setSelectedOnu(
              null,
            )

          }

        }}
      />

    </PageContainer>
  )
}