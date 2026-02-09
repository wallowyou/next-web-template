import { DatasetAttr } from '@/types/feature'

const getStringConfig = (
  envVar: string | undefined,
  dataAttrKey: DatasetAttr,
  defaultValue: string,
) => {
  if (envVar)
    return envVar

  const attrValue = globalThis.document?.body?.getAttribute(dataAttrKey)
  if (attrValue)
    return attrValue
  return defaultValue
}

export const API_PREFIX = getStringConfig(
  process.env.NEXT_PUBLIC_API_PREFIX,
  DatasetAttr.DATA_API_PREFIX,
  'http://localhost:5001/console/api',
)
export const PUBLIC_API_PREFIX = getStringConfig(
  process.env.NEXT_PUBLIC_PUBLIC_API_PREFIX,
  DatasetAttr.DATA_PUBLIC_API_PREFIX,
  'http://localhost:5001/api',
)
export const MARKETPLACE_API_PREFIX = getStringConfig(
  process.env.NEXT_PUBLIC_MARKETPLACE_API_PREFIX,
  DatasetAttr.DATA_MARKETPLACE_API_PREFIX,
  'http://localhost:5002/api',
)
export const MARKETPLACE_URL_PREFIX = getStringConfig(
  process.env.NEXT_PUBLIC_MARKETPLACE_URL_PREFIX,
  DatasetAttr.DATA_MARKETPLACE_URL_PREFIX,
  '',
)
