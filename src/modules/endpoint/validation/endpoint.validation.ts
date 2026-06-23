import { prisma } from '../../../config/prisma'
import { ForbiddenError } from '../../../core/errors/forbidden.error'
import { NotFoundError } from '../../../core/errors/not-found.error'
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
export async function validReadyDeleteEndpoint(
  id: string,
) {
  const endpoint =
    await prisma.endpoint.findUnique({
      where: {
        id,
      },
    })
  if (!endpoint) {
    throw new NotFoundError(
      'ENDPOINT_NOT_FOUND',
    )
  }
  const [
    onuCount,
    replacementCount,
  ] = await Promise.all([
    prisma.onu.count({
      where: {
        endpointId: id,
      },
    }),
    prisma.onuReplacement.count({
      where: {
        endpointId: id,
      },
    }),
  ])
  if (
    onuCount > 0 ||
    replacementCount > 0
  ) {
    throw new ForbiddenError(
      'ENDPOINT_CANNOT_DELETE',
      {
        onus:
          onuCount,
        replacements:
          replacementCount,
      },
    )
  }
  return endpoint
}