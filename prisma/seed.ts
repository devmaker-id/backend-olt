import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash(
    'admin123',
    10
  )

  const owner = await prisma.user.create({
    data: {
      username: 'owner',
      password,
      role: 'OWNER'
    }
  })

  console.log('OWNER CREATED')
  console.log(owner.username)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })