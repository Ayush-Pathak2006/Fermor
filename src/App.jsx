// The page outline: providers, then the sections in order. Nothing else lives here.
import { LazyMotion, MotionConfig, domMin } from 'motion/react'
import { Suspense, lazy } from 'react'
import AfterFirstPaint from './components/layout/AfterFirstPaint.jsx'
import SiteFooter from './components/layout/SiteFooter.jsx'
import SiteHeader from './components/layout/SiteHeader.jsx'
import SkipLink from './components/layout/SkipLink.jsx'
import AppShowcase from './components/sections/AppShowcase.jsx'
import DecisionIndex from './components/sections/DecisionIndex.jsx'
import Faq from './components/sections/Faq.jsx'
import FinalCta from './components/sections/FinalCta.jsx'
import ForCAs from './components/sections/ForCAs.jsx'
import FreeTools from './components/sections/FreeTools.jsx'
import Guides from './components/sections/Guides.jsx'
import Hero from './components/sections/Hero.jsx'
import HowItWorks from './components/sections/HowItWorks.jsx'
import PopularTools from './components/sections/PopularTools.jsx'
import { ComingSoonProvider } from './context/ComingSoonContext.jsx'

// The dialog is only needed after a click, so it loads as its own chunk.
const ComingSoonDialog = lazy(
  () => import('./components/layout/ComingSoonDialog.jsx'),
)

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domMin} strict>
        <ComingSoonProvider>
          <SkipLink />
          <SiteHeader />
          <main id="main-content" tabIndex={-1}>
            <Hero />
            <PopularTools />
            <AfterFirstPaint>
              <DecisionIndex />
              <FreeTools />
              <AppShowcase />
              <Guides />
              <HowItWorks />
              <ForCAs />
              <Faq />
              <FinalCta />
            </AfterFirstPaint>
          </main>
          <SiteFooter />
          <Suspense fallback={null}>
            <ComingSoonDialog />
          </Suspense>
        </ComingSoonProvider>
      </LazyMotion>
    </MotionConfig>
  )
}
