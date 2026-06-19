import { prisma } from '../../../config/prisma'
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