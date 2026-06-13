export function normalizeOnuName(
  value: string
) {

  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
}
export function normalizeMac(
  mac: string
) {

  return mac
    .trim()
    .toUpperCase()
}

export function generateNameOnu(
  name: string
) {

  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}