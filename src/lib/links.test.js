import { describe, expect, it } from 'vitest'
import {
  getHostname,
  getLinkKind,
  getSectionId,
  isExternalLink,
  isSectionLink,
} from './links.js'

describe('isExternalLink', () => {
  it('is true for http and https URLs', () => {
    expect(isExternalLink('https://fermor.in/calculators')).toBe(true)
    expect(isExternalLink('http://fermor.in')).toBe(true)
  })

  it('is false for section links and plain paths', () => {
    expect(isExternalLink('#tools')).toBe(false)
    expect(isExternalLink('/calculators')).toBe(false)
  })
})

describe('isSectionLink and getSectionId', () => {
  it('recognises "#id" and reads the id', () => {
    expect(isSectionLink('#tools')).toBe(true)
    expect(getSectionId('#tools')).toBe('tools')
  })

  it('rejects a bare "#", which would be a dead link', () => {
    expect(isSectionLink('#')).toBe(false)
  })
})

describe('getHostname', () => {
  it('returns the real domain for screen reader text', () => {
    expect(getHostname('https://fermor.in/calculators')).toBe('fermor.in')
    expect(getHostname('https://ca.fermor.in/ca/try')).toBe('ca.fermor.in')
    expect(getHostname('https://www.example.com/')).toBe('example.com')
  })
})

describe('getLinkKind', () => {
  it('is "soon" for a product, even if an href is also given', () => {
    expect(getLinkKind({ productId: 'ask' })).toBe('soon')
    expect(getLinkKind({ productId: 'ask', href: '#tools' })).toBe('soon')
  })

  it('is "internal" for a section jump and "external" for another site', () => {
    expect(getLinkKind({ href: '#waitlist' })).toBe('internal')
    expect(getLinkKind({ href: 'https://fermor.in/blogs' })).toBe('external')
  })

  it('throws for a missing or dead link instead of rendering one', () => {
    expect(() => getLinkKind({})).toThrow()
    expect(() => getLinkKind({ href: '#' })).toThrow()
    expect(() => getLinkKind({ href: 'javascript:void(0)' })).toThrow()
  })
})
