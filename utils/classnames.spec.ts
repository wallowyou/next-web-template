import { describe, expect, it } from 'vitest'
import { cn } from './classnames'

describe('cn', () => {
  it('returns empty string for no arguments', () => {
    expect(cn()).toBe('')
  })

  it('returns single string as-is', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('merges multiple strings with space', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('filters falsy string values', () => {
    expect(cn('foo', '', 'bar', null, undefined)).toBe('foo bar')
  })

  it('handles conditional object syntax (truthy keys)', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
  })

  it('handles array of classes', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
  })

  it('handles mixed inputs (string, object, array)', () => {
    expect(cn('base', { active: true, disabled: false }, ['extra'])).toBe(
      'base active extra',
    )
  })

  it('merges Tailwind conflicting classes (later wins)', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2')
  })

  it('merges Tailwind with non-conflicting classes', () => {
    expect(cn('p-4', 'm-2')).toBe('p-4 m-2')
  })

  it('handles Tailwind merge in conditional object', () => {
    expect(cn('p-4', { 'p-2': true })).toBe('p-2')
  })

  it('handles undefined and null in object values', () => {
    expect(cn({ foo: undefined, bar: null })).toBe('')
  })
})
