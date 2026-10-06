import { describe, expect, it } from 'vitest'
import { isValidEmail } from './email.js'

describe('isValidEmail', () => {
  it('accepts ordinary addresses', () => {
    expect(isValidEmail('name@example.com')).toBe(true)
    expect(isValidEmail('first.last+tag@mail.example.co.in')).toBe(true)
  })

  it('ignores spaces around the address', () => {
    expect(isValidEmail('  name@example.com  ')).toBe(true)
  })

  it('rejects the usual typos', () => {
    expect(isValidEmail('')).toBe(false)
    expect(isValidEmail('name')).toBe(false)
    expect(isValidEmail('name@')).toBe(false)
    expect(isValidEmail('name@example')).toBe(false)
    expect(isValidEmail('@example.com')).toBe(false)
    expect(isValidEmail('na me@example.com')).toBe(false)
  })
})
