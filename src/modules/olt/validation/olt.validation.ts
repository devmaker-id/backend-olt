import { prisma } from '../../../config/prisma'
import { ForbiddenError } from '../../../core/errors/forbidden.error'
import { NotFoundError } from '../../../core/errors/not-found.error'
import { ValidationError } from '../../../core/errors/validation.error'

export async function validationDuplicate(
    ip: string
) {
    const found = await prisma.olt.findUnique({
        where: {
            ipAddress: ip
        }
    })
    if(found){
        throw new ValidationError(
            'OLT_ALREADY_REGISTERED'
        )
    }
}

export async function validateReadyOlt(
    id: string
) {
    const olt = await prisma.olt.findUnique({
        where: {
            id
        }
    })
    if(!olt){
        throw new NotFoundError(
            'OLT_NOT_FOUND'
        )
    }
    return olt
}

export async function validateOnuDetail(
    oltId: string,
    portId: string,
    onuId: string
) {
    if(!oltId || !portId || !onuId){
        throw new ForbiddenError(
            'REQUIRED_FALID_PORID_ONUID_EXIST'
        )
    }
    const onu = await prisma.onu.findFirst({
        where:{
            oltId,
            portId,
            onuId
        },
        include:{
            olt: true
        }
    })
    if(!onu){
        throw new ForbiddenError(
            'REQUIRED_FALID_PORID_ONUID_EXIST'
        )
    }
    return onu
}