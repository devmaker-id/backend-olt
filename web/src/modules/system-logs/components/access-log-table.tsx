import {
  Eye,
  Trash2
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { TelegramAccessLog } from '../types/telegram-access-log.types'

import { AccessLogStatusBadge } from './access-log-status-badge'

interface AccessLogTableProps {
  logs: TelegramAccessLog[]
  onDetail: (
    log: TelegramAccessLog
  ) => void
  onDelete: (
    log: TelegramAccessLog
  ) => void
}

export function AccessLogTable({
  logs,
  onDetail,
  onDelete,
}: AccessLogTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Time
          </TableHead>

          <TableHead>
            User
          </TableHead>

          <TableHead>
            Message
          </TableHead>

          <TableHead>
            Status
          </TableHead>

          <TableHead>
            Action
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>
              {new Date(
                log.createdAt
              ).toLocaleString()}
            </TableCell>

            <TableCell>
              {log.username}
            </TableCell>

            <TableCell>
              {log.message}
            </TableCell>

            <TableCell>
              <AccessLogStatusBadge
                isAuthorized={
                  log.isAuthorized
                }
              />
            </TableCell>

            <TableCell>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    onDetail(log)
                  }
                >
                  <Eye />
                </Button>
                {' '}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    onDelete(log)
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}