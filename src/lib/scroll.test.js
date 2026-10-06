// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { prefersReducedMotion, scrollToSection } from './scroll.js'

function setReducedMotion(isReduced) {
  window.matchMedia = vi.fn().mockReturnValue({ matches: isReduced })
}

beforeEach(() => {
  document.body.innerHTML = `
    <section id="tools"><h2>Free tools</h2></section>
    <section id="waitlist"><h2>Get early access</h2><input data-scroll-focus /></section>
  `
  Element.prototype.scrollIntoView = vi.fn()
  setReducedMotion(false)
})

describe('prefersReducedMotion', () => {
  it('reads the system setting', () => {
    setReducedMotion(true)
    expect(prefersReducedMotion()).toBe(true)
    setReducedMotion(false)
    expect(prefersReducedMotion()).toBe(false)
  })

  it('is false when matchMedia is missing', () => {
    window.matchMedia = undefined
    expect(prefersReducedMotion()).toBe(false)
  })
})

describe('scrollToSection', () => {
  it('scrolls smoothly and focuses the section heading', () => {
    expect(scrollToSection('tools')).toBe(true)
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
    expect(document.activeElement).toBe(document.querySelector('#tools h2'))
  })

  it('jumps instantly under reduced motion', () => {
    setReducedMotion(true)
    scrollToSection('tools')
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'start',
    })
  })

  it("focuses the section's own target, such as the email field, instead of the heading", () => {
    scrollToSection('waitlist')
    expect(document.activeElement).toBe(
      document.querySelector('#waitlist input'),
    )
  })

  it('puts the section in the address bar', () => {
    scrollToSection('tools')
    expect(window.location.hash).toBe('#tools')
  })

  it('returns false at once, without scrolling, when the section is not on the page', () => {
    expect(scrollToSection('missing')).toBe(false)
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled()
  })

  it('waits for a section that mounts a moment later, then jumps to it', async () => {
    expect(scrollToSection('late')).toBe(false)
    document.body.insertAdjacentHTML(
      'beforeend',
      '<section id="late"><h2>Late section</h2></section>',
    )

    await vi.waitFor(() =>
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled(),
    )
    expect(document.activeElement).toBe(document.querySelector('#late h2'))
    expect(window.location.hash).toBe('#late')
  })
})
