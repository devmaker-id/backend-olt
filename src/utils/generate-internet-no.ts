import { prisma } from '../config/prisma'

export async function generateInternetNo() {

  const now = new Date()

  const dd =
    String(now.getDate())
      .padStart(2, '0')

  const mm =
    String(now.getMonth() + 1)
      .padStart(2, '0')

  const yy =
    String(now.getFullYear())
      .slice(-2)

  const prefix =
    `1998${dd}${mm}${yy}`

  const total =
    await prisma.endpoint.count({

      where: {
        internetNo: {
          startsWith: prefix
        }
      }
    })

  const sequence =
    String(total + 1)
      .padStart(3, '0')

  return `${prefix}${sequence}`
}