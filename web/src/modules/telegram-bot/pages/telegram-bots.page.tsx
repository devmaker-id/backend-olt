import { useMemo } from 'react'
import { useState } from 'react'

import {
  Button,
} from '@/components/ui/button'

import {
  PageContainer,
} from '@/shared/components/page-container'

import {
  PageHeader,
} from '@/shared/components/page-header'

import {
  CreateTelegramBotDialog,
} from '../components/create-telegram-bot-dialog'

import {
  EditTelegramBotDialog,
} from '../components/edit-telegram-bot-dialog'

import {
  TelegramBotDetailSheet,
} from '../components/telegram-bot-detail-sheet'

import {
  TelegramBotSummary,
} from '../components/telegram-bot-summary'

import {
  TelegramBotTable,
} from '../components/telegram-bot-table'

import {
  TelegramBotToolbar,
} from '../components/telegram-bot-toolbar'

import {
  useTelegramBots,
} from '../hooks/use-telegram-bots'

import type {
  TelegramBot,
} from '../types/telegram-bot.types'

export function TelegramBotsPage() {

  const {
    data = [],
    isLoading,
  } = useTelegramBots()

  const [
    search,
    setSearch,
  ] = useState('')

  const [
    createOpen,
    setCreateOpen,
  ] = useState(false)

  const [
    selectedBot,
    setSelectedBot,
  ] = useState<TelegramBot | null>(
    null,
  )

  const [
    detailBot,
    setDetailBot,
  ] = useState<TelegramBot | null>(
    null,
  )

  const filteredBots =
    useMemo(() => {

      const keyword =
        search.toLowerCase()

      return data.filter(
        (bot: TelegramBot) =>
          bot.name
            .toLowerCase()
            .includes(keyword) ||
          bot.username
            .toLowerCase()
            .includes(keyword),
      )

    }, [
      data,
      search,
    ])

  return (
    <PageContainer>

      <PageHeader
        title="Telegram Bots"
        description="
          Manage telegram bots
        "
        actions={

          <Button
            onClick={() =>
              setCreateOpen(true)
            }
          >
            Add Bot
          </Button>

        }
      />

      <TelegramBotSummary
        bots={data}
      />

      <TelegramBotToolbar
        search={search}
        onSearchChange={
          setSearch
        }
      />

      <TelegramBotTable
        bots={filteredBots}
        isLoading={isLoading}
        onEdit={
          setSelectedBot
        }
        onView={
          setDetailBot
        }
      />

      <CreateTelegramBotDialog
        open={createOpen}
        onOpenChange={
          setCreateOpen
        }
      />

      <EditTelegramBotDialog
        bot={selectedBot}
        open={
          Boolean(
            selectedBot,
          )
        }
        onOpenChange={(
          open,
        ) => {

          if (!open) {
            setSelectedBot(
              null,
            )
          }

        }}
      />

      <TelegramBotDetailSheet
        bot={detailBot}
        open={
          Boolean(
            detailBot,
          )
        }
        onOpenChange={(
          open,
        ) => {

          if (!open) {
            setDetailBot(
              null,
            )
          }

        }}
      />

    </PageContainer>
  )
}