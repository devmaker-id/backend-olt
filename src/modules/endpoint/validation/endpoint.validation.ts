import { prisma } from '../../../config/prisma'
import { ValidationError } from '../../../core/errors/validation.error'

export async function validatePackageExists(
  packageId: string
) {
  const packageData = await prisma.package.findUnique({
    where: {
      id: packageId
    }
  })
  if(!packageData){
    throw new ValidationError(
      'PACKAGE_NOT_FOUND'
    )
  }
  return packageData
}
export async function validateEmailUnique(
  email: string
) {
  const endpoint = await prisma.endpoint.findFirst({
    where: {
      email
    }
  })
  if(endpoint) {
    throw new ValidationError(
      'EMAIL_ALREADY_EXISTS'
    )
  }
}
export async function validateUniqueInternetNo(
  internetNo: string,
  excludeId?: string,
) {

  const endpoint = await prisma.endpoint.findFirst({
      where: {
        internetNo,

        NOT: excludeId
          ? {
              id: excludeId,
            }
          : undefined,
      },
    })

  if (endpoint) {
    throw new ValidationError(
      'INTERNET_NUMBER_ALREADY_EXISTS'
    )
  }
}