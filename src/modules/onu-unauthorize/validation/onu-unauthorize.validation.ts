import { prisma } from '../../../config/prisma'
import { ValidationError } from '../../../core/errors/validation.error'

export async function validateUnauthorizeOnuIdentity(
    params: {
        macAddress?: string
        serialNumber?: string
    }
){
    let exiting = null
    if(params.macAddress) {
        exiting = await prisma.unauthorizedOnu.findFirst({
            where: {
                macAddress: params.macAddress,
            }
        })
    }
    if(!exiting && params.serialNumber){
        exiting = await prisma.unauthorizedOnu.findFirst({
            where: {
                serialNumber: params.serialNumber,
            }
        })
    }
    return exiting
}