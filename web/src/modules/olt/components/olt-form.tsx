import { useState } from 'react'

import type {
  OltPlatform,
  OltConnectionType,
} from '@prisma/client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { Olt } from '../types/olt.types'

interface OltFormData {
  name: string
  syslogName: string

  ipAddress: string
  managementPort: number

  username: string
  password: string

  vendor: string

  platform: OltPlatform
  connectionType: OltConnectionType

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
    initialValues?.syslogName ?? ''
  )

  const [
    ipAddress,
    setIpAddress,
  ] = useState(
    initialValues?.ipAddress ?? ''
  )

  const [
    managementPort,
    setManagementPort,
  ] = useState(
    initialValues?.managementPort ?? 23
  )

  const [
    username,
    setUsername,
  ] = useState(
    initialValues?.username ?? 'admin'
  )

  const [
    password,
    setPassword,
  ] = useState(
    initialValues?.password ?? 'admin'
  )

  const [vendor, setVendor] =
    useState(
      initialValues?.vendor ??
        'HISFOCUS'
    )

  const [
    platform,
    setPlatform,
  ] = useState<OltPlatform>(
    initialValues?.platform ??
      'HIOSO'
  )

  const [
    connectionType,
    setConnectionType,
  ] = useState<OltConnectionType>(
    initialValues?.connectionType ??
      'TELNET'
  )

  const [
    location,
    setLocation,
  ] = useState(
    initialValues?.location ?? ''
  )

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault()

    await onSubmit({
      name,
      syslogName,

      ipAddress,
      managementPort,

      username,
      password,

      vendor,

      platform,
      connectionType,

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
          placeholder="Management Port"
          value={managementPort}
          onChange={(e) =>
            setManagementPort(
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

        <Input
          placeholder="Vendor / Brand"
          value={vendor}
          onChange={(e) =>
            setVendor(
              e.target.value
            )
          }
        />

        <Select
          value={platform}
          onValueChange={(value) => {
            const selected =
              value as OltPlatform

            setPlatform(
              selected
            )

            if (
              selected ===
              'HIOSO'
            ) {
              setConnectionType(
                'TELNET'
              )

              setManagementPort(
                23
              )
            }

            if (
              selected ===
              'VSOL'
            ) {
              setConnectionType(
                'SSH'
              )

              setManagementPort(
                22
              )
            }
          }}
        >
          <SelectTrigger
            className="
              h-10
              w-full
            "
          >
            <SelectValue
              placeholder="Platform"
            />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="HIOSO">
              HIOSO
            </SelectItem>

            <SelectItem value="VSOL">
              VSOL
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={connectionType}
          onValueChange={(value) =>
            setConnectionType(
              value as OltConnectionType
            )
          }
        >
          <SelectTrigger
            className="
              h-10
              w-full
            "
          >
            <SelectValue
              placeholder="Connection Type"
            />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="TELNET">
              TELNET
            </SelectItem>

            <SelectItem value="SSH">
              SSH
            </SelectItem>

            <SelectItem value="API">
              API
            </SelectItem>

            <SelectItem value="SNMP">
              SNMP
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