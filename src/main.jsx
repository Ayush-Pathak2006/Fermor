import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import './index.css'
import App from './App.jsx'

// The style guide is a development aid. In a production build this branch is removed.
async function loadRoot() {
  const wantsStyleGuide = new URLSearchParams(window.location.search).has(
    'styleguide',
  )
  if (import.meta.env.DEV && wantsStyleGuide) {
    const { default: StyleGuide } = await import('./dev/StyleGuide.jsx')
    return StyleGuide
  }
  return App
}

loadRoot().then((Root) => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Root />
    </StrictMode>,
  )
})
