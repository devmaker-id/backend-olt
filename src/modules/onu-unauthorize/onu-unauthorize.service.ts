import {prisma} from '../../config/prisma'

import { createOnuUnauthorizeDto } from './schemas/create-onu-unauthorize.schema'

export async function createOnuUnauthorize(
    data: createOnuUnauthorizeDto
){
    return
}

export async function getUnAuthorizes(){
    return prisma.unauthorizedOnu.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
}

export async function getUnauthorizeOnuById(
    id: string
) {
    return prisma.unauthorizedOnu.findUnique({
        where: {
            id
        }
    })
}
export async function getUnauthorizeOnuByMacAddress(
    macAddress: string
) {
    return prisma.unauthorizedOnu.findFirst({
        where: {
            macAddress
        }
    })
}
export async function getUnauthorizeOnuBySerialNumber(
    serialNumber: string
) {
    return prisma.unauthorizedOnu.findFirst({
        where: {
            serialNumber
        }
    })
}
export async function deleteUnauthorizeOnu(
    id: string
) {
    const response = await prisma.unauthorizedOnu.delete({
        where: {
            id
        }
    })
    return response
}