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