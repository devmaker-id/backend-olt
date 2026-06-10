import { useState } from 'react'

import { PageHeader } from '@/shared/components/page-header'
import { LoadingState } from '@/shared/components/loading-state'
import { EmptyState } from '@/shared/components/empty-state'
import { ErrorState } from '@/shared/components/error-state'

import { useTelegramAccessLogs } from '../hooks/use-telegram-access-logs'

import type { TelegramAccessLog } from '../types/telegram-access-log.types'
import { AccessLogTable } from '../components/access-log-table'
import { AccessLogDetailSheet } from '../components/access-log-detail-sheet'
import { useDeleteTelegramAccessLog } from '../hooks/use-delete-telegram-access-log'

import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTableToolbar } from '@/shared/components/data-table-toolbar'

import { AccessLogSearch } from '../components/access-log-search'
import { PageContainer } from '@/shared/components/page-container'
import { AccessLogFilter } from '../components/access-log-filter'
import { ConfirmDelete } from '@/shared/components/confirm-delete'
import { AccessLogSort } from '../components/access-log-sort'

export default function TelegramAccessLogsPage() {
  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useTelegramAccessLogs()

  const [selectedLog, setSelectedLog] = useState<TelegramAccessLog | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const pageSize = 10
  const deleteMutation = useDeleteTelegramAccessLog()
  const [deleteLog, setDeleteLog] = useState<TelegramAccessLog | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  if(isLoading) {
    return (
      <LoadingState />
    )
  }

  if(error) {
    return (
      <ErrorState
        message='Gagagl mendapatkan data telegram access logs'
      />
    )
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title='No Access Log'
        description='Telegram access logs will appear here.'
      />
    )
  }

  const filteredLogs = data.filter((log: TelegramAccessLog) => {
    const keyword = search.toLowerCase()
    const matchesSearch =
      log.username?.toLowerCase().includes(keyword) ||
      String(log.telegramId)?.includes(keyword) ||
      log.message?.toLowerCase().includes(keyword)

    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'authorized'
          ? log.isAuthorized
          : !log.isAuthorized
    
    return (
      matchesSearch && matchesFilter
    )
  })
  const sortedLogs = [...filteredLogs]
  sortedLogs.sort((a, b) => {
    const first =
      new Date(
        a.createdAt
      ).getTime()

    const second =
      new Date(
        b.createdAt
      ).getTime()

    return sortOrder === 'desc'
      ? second - first
      : first - second
  })

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedLogs.length /
      pageSize
    )
  )
  const paginatedLogs = sortedLogs.slice(
    (page - 1) * pageSize,
    page * pageSize
  )
  
  return (
    <PageContainer>
      <PageHeader
        title="Telegram Access Logs"
        description="Monitor telegram bot activity and command usage."
      />

      <DataTableToolbar
        search={
          <AccessLogSearch
            value={search}
            onChange={(value) => {
              setSearch(value)
              setPage(1)
            }}
          />
        }
        actions={
          <>
            <AccessLogSort
              order={sortOrder}
              onChange={setSortOrder}
            />
            <AccessLogFilter
              value={filter}
              onChange={(value) => {
                setFilter(value)
                setPage(1)
              }}
            />
            <Button
              variant="outline"
              disabled={isFetching}
              onClick={() => {
                refetch()
              }}
            >
              <RefreshCw
                size={13}
                className={isFetching ? "animate-spin" : ""}
              />
              Refresh
            </Button>
          </>
        }
      />

      <AccessLogTable
        logs={paginatedLogs}
        onDetail={(log) => {
          setSelectedLog(log)
          setDetailOpen(true)
        }}
        onDelete={(log) => {
          setDeleteLog(log)
          setDeleteOpen(true)
        }}
      />
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
        >
          Previous
        </Button>

        <span>
          Page {page} of{' '}
          {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={
            page === totalPages
          }
          onClick={() =>
            setPage(page + 1)
          }
        >
          Next
        </Button>
      </div>

      <AccessLogDetailSheet
        log={selectedLog}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
      <ConfirmDelete
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Access Log"
        description="This action cannot be undone."
        onConfirm={() => {
          if (!deleteLog) {
            return
          }
          deleteMutation.mutate(
            deleteLog.id, {
              onSuccess: () => {
                setDeleteOpen(false)
              }
            }
          )
          setDeleteOpen(false)
        }}
      />
    </PageContainer>
  )
}