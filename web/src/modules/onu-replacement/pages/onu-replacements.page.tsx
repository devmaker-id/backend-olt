import { useMemo } from 'react'
import { useState } from 'react'

import {
  PageContainer,
} from '@/shared/components/page-container'

import {
  PageHeader,
} from '@/shared/components/page-header'

import {
  OnuReplacementDetailSheet,
} from '../components/onu-replacement-detail-sheet'

import {
  OnuReplacementSummary,
} from '../components/onu-replacement-summary'

import {
  OnuReplacementTable,
} from '../components/onu-replacement-table'

import {
  OnuReplacementToolbar,
} from '../components/onu-replacement-toolbar'

import {
  useOnuReplacements,
} from '../hooks/use-onu-replacements'

import type {
  OnuReplacement,
} from '../types/onu-replacement.types'

export function OnuReplacementsPage() {

  const {
    data = [],
    isLoading,
  } = useOnuReplacements()

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
    selectedReplacement,
    setSelectedReplacement,
  ] = useState<OnuReplacement | null>(
    null,
  )

  const filteredData =
    useMemo(() => {

      const keyword =
        search.toLowerCase()

      return data.filter(
        (
          item: OnuReplacement,
        ) => {

          return (

            item.endpoint.internetNo
              ?.toLowerCase()
              .includes(
                keyword,
              )

            ||

            item.endpoint.name
              ?.toLowerCase()
              .includes(
                keyword,
              )

            ||

            item.oldOnu.onuMac
              ?.toLowerCase()
              .includes(
                keyword,
              )

            ||

            item.newOnu.onuMac
              ?.toLowerCase()
              .includes(
                keyword,
              )

            ||

            item.reason
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
        filteredData.length /
        pageSize,
      ),
    )

  const paginatedData =
    filteredData.slice(
      (page - 1) * pageSize,
      page * pageSize,
    )

  return (
    <PageContainer>

      <PageHeader
        title="
          ONU Replacement History
        "
        description="
          Historical ONU replacement records.
        "
      />

      <OnuReplacementSummary
        total={
          filteredData.length
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

        <OnuReplacementToolbar
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

      <OnuReplacementTable
        replacements={
          paginatedData
        }
        isLoading={
          isLoading
        }
        onView={
          setSelectedReplacement
        }
      />

      <div
        className="
          flex
          items-center
          justify-end
          gap-4
        "
      >

        <button
          className="
            rounded-md
            border
            px-3
            py-2
          "
          disabled={
            page === 1
          }
          onClick={() =>
            setPage(
              page - 1,
            )
          }
        >
          Prev
        </button>

        <span
          className="
            text-sm
            text-muted-foreground
          "
        >

          Page {page}
          {' / '}
          {totalPages}

        </span>

        <button
          className="
            rounded-md
            border
            px-3
            py-2
          "
          disabled={
            page === totalPages
          }
          onClick={() =>
            setPage(
              page + 1,
            )
          }
        >
          Next
        </button>

      </div>

      <OnuReplacementDetailSheet
        replacement={
          selectedReplacement
        }
        open={
          Boolean(
            selectedReplacement,
          )
        }
        onOpenChange={(
          open,
        ) => {

          if (!open) {

            setSelectedReplacement(
              null,
            )

          }

        }}
      />

    </PageContainer>
  )
}