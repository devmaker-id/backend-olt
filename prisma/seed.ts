import bcrypt from 'bcrypt'
import {
  PrismaClient,
  Role
} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  const password =
    await bcrypt.hash(
      'admin123',
      10
    )

  const users = [

    {
      username: 'owner',
      password,
      role: Role.OWNER,

      email: 'owner@olt.local',
      telepon: '081111111111',
      alamat: 'Kantor Pusat',
      telegramId: '0',
    },

    {
      username: 'teknisi',
      password,
      role: Role.TEKNISI,

      email: 'teknisi@olt.local',
      telepon: '082222222222',
      alamat: 'Area Operasional',
      telegramId: '0',
    },

  ]

  for (const user of users) {

    const existingUser =
      await prisma.user.findUnique({
        where: {
          username: user.username,
        },
      })

    if (existingUser) {
      console.log(
        `${user.username} already exists`
      )
      continue
    }

    await prisma.user.create({
      data: user,
    })

    console.log(
      `${user.username} created`
    )

  }

}

main()
  .catch((e) => {

    console.error(e)

    process.exit(1)

  })
  .finally(async () => {

    await prisma.$disconnect()

  })