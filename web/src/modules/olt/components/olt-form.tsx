import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useState } from 'react'

import type { Olt } from '../types/olt.types'

interface OltFormData {
  name: string
  syslogName: string
  ipAddress: string
  telnetPort: number
  username: string
  password: string
  vendor: string
  location: string
}

interface Props {
  initialValues?: Partial<Olt>

  isLoading?: boolean

  onSubmit: (
    values: OltFormData
  ) => Promise<void>

  submitLabel?: string
}

export function OltForm({
  initialValues,
  onSubmit,
  isLoading,
  submitLabel = 'Save',
}: Props) {
  const [name, setName] =
    useState(
      initialValues?.name ?? ''
    )

  const [
    syslogName,
    setSyslogName,
  ] = useState(
    initialValues?.syslogName ??
      ''
  )

  const [
    ipAddress,
    setIpAddress,
  ] = useState(
    initialValues?.ipAddress ??
      ''
  )

  const [
    telnetPort,
    setTelnetPort,
  ] = useState(
    initialValues?.telnetPort ??
      23
  )

  const [
    username,
    setUsername,
  ] = useState(
    initialValues?.username ??
      'admin'
  )

  const [
    password,
    setPassword,
  ] = useState(
    initialValues?.password ??
      'admin'
  )

  const [vendor, setVendor] =
    useState(
      initialValues?.vendor ??
        'HISFOCUS'
    )

  const [location, setLocation] =
    useState(
      initialValues?.location ??
        ''
    )

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault()

    await onSubmit({
      name,
      syslogName,
      ipAddress,
      telnetPort,
      username,
      password,
      vendor,
      location,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div
        className="
          grid
          gap-4
          md:grid-cols-2
        "
      >
        <Input
          placeholder="OLT Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

        <Input
          placeholder="Syslog Name"
          value={syslogName}
          onChange={(e) =>
            setSyslogName(
              e.target.value
            )
          }
        />

        <Input
          placeholder="IP Address"
          value={ipAddress}
          onChange={(e) =>
            setIpAddress(
              e.target.value
            )
          }
        />

        <Input
          type="number"
          placeholder="Telnet Port"
          value={telnetPort}
          onChange={(e) =>
            setTelnetPort(
              Number(
                e.target.value
              )
            )
          }
        />

        <Input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <Select
          value={vendor}
          onValueChange={
            setVendor
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="HISFOCUS">
              HISFOCUS
            </SelectItem>

            <SelectItem value="HUAWEI">
              HUAWEI
            </SelectItem>

            <SelectItem value="ZTE">
              ZTE
            </SelectItem>

            <SelectItem value="FIBERHOME">
              FIBERHOME
            </SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(
              e.target.value
            )
          }
        />
      </div>

      <div
        className="
          flex
          justify-end
        "
      >
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? 'Saving...'
            : submitLabel}
        </Button>
      </div>
    </form>
  )
}