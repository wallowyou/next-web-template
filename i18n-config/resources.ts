import { kebabCase } from 'es-toolkit/string'

import common from '../i18n/en-US/common.json'
// @keep-sorted
const resources = {
  common,
}

export type KebabCase<S extends string> = S extends `${infer T}${infer U}`
  ? T extends Lowercase<T>
    ? `${T}${KebabCase<U>}`
    : `-${Lowercase<T>}${KebabCase<U>}`
  : S

export type CamelCase<S extends string> = S extends `${infer T}-${infer U}`
  ? `${T}${Capitalize<CamelCase<U>>}`
  : S

export type Resources = typeof resources
export type NamespaceCamelCase = keyof Resources
export type NamespaceKebabCase = KebabCase<NamespaceCamelCase>

export const namespacesCamelCase = Object.keys(resources) as NamespaceCamelCase[]
export const namespacesKebabCase = namespacesCamelCase.map(ns => kebabCase(ns)) as NamespaceKebabCase[]
