import type { Hooks, SearchParamsOption } from 'ky'
import ky from 'ky'
import { API_PREFIX, MARKETPLACE_API_PREFIX, PUBLIC_API_PREFIX } from '@/config'
// 超时
const TIME_OUT = 100000
export const ContentType = {
  json: 'application/json',
  stream: 'text/event-stream',
  audio: 'audio/mpeg',
  form: 'application/x-www-form-urlencoded; charset=UTF-8',
  download: 'application/octet-stream', // for download
  downloadZip: 'application/zip', // for download
  upload: 'multipart/form-data', // for upload
}

export type FetchOptionType = Omit<RequestInit, 'body'> & {
  params?: SearchParamsOption
  body?: BodyInit | Record<string, unknown> | null
}
const baseHooks: Hooks = {
  // 请求拦截器
  beforeRequest: [() => console.warn('before 1')],
  // 响应拦截器
  afterResponse: [() => console.warn('after 1')],
}
// 初始化ky实例
const baseClient = ky.create({
  timeout: TIME_OUT,
  hooks: baseHooks,
})
// 默认配置
export const getBaseOptions = (): RequestInit => ({
  method: 'GET',
  mode: 'cors',
  credentials: 'include', // always send cookies、HTTP Basic authentication.
  headers: new Headers({
    'Content-Type': ContentType.json,
  }),
  redirect: 'follow',
})
export type IOtherOptions = {
  isPublicAPI?: boolean
  isMarketplaceAPI?: boolean
  bodyStringify?: boolean
  needAllResponseContent?: boolean
  deleteContentType?: boolean
  silent?: boolean
  /** If true, behaves like standard fetch: no URL prefix, returns raw Response */
  fetchCompat?: boolean
  request?: Request
  getAbortController?: (abortController: AbortController) => void
}
// 封装的请求实例
const base = async <T>(url: string, options: FetchOptionType, otherOptions: IOtherOptions): Promise<T> => {
  const baseOptions = otherOptions.fetchCompat
    ? {
        mode: 'cors',
        credentials: 'include', // always send cookies、HTTP Basic authentication.
        redirect: 'follow',
      }
    : {
        mode: 'cors',
        credentials: 'include', // always send cookies、HTTP Basic authentication.
        headers: new Headers({
          'Content-Type': ContentType.json,
        }),
        method: 'GET',
        redirect: 'follow',
      }
  const { params, body, headers: headersFromProps, ...init } = Object.assign({}, baseOptions, options)
  const headers = new Headers(headersFromProps || {})
  const {
    isPublicAPI = false,
    isMarketplaceAPI = false,
    bodyStringify = true,
    needAllResponseContent,
    getAbortController,
    fetchCompat = false,
    request,
  } = otherOptions
  let base: string
  if (isMarketplaceAPI)
    base = MARKETPLACE_API_PREFIX
  else if (isPublicAPI)
    base = PUBLIC_API_PREFIX
  else
    base = API_PREFIX

  if (getAbortController) {
    const abortController = new AbortController()
    getAbortController(abortController)
    options.signal = abortController.signal
  }
  const fetchPathname = base + (url.startsWith('/') ? url : `/${url}`)
  const client = baseClient.extend({
    hooks: {
      ...baseHooks,
    },
  })

  const res = await client(request || fetchPathname, {
    ...init,
    headers,
    credentials: isMarketplaceAPI
      ? 'omit'
      : (options.credentials || 'include'),
    retry: {
      methods: [],
    },
    ...(bodyStringify && !fetchCompat ? { json: body } : { body: body as BodyInit }),
    searchParams: !fetchCompat ? params : undefined,
    fetch(resource: RequestInfo | URL, options?: RequestInit) {
      if (resource instanceof Request && options) {
        const mergedHeaders = new Headers(options.headers || {})
        resource.headers.forEach((value, key) => {
          mergedHeaders.append(key, value)
        })
        options.headers = mergedHeaders
      }
      return globalThis.fetch(resource, options)
    },
  })

  if (needAllResponseContent || fetchCompat)
    return res as T
  const contentType = res.headers.get('content-type')
  if (
    contentType
    && [ContentType.download, ContentType.audio, ContentType.downloadZip].includes(contentType)
  ) {
    return await res.blob() as T
  }

  return await res.json() as T
}

export { base }
