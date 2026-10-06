// The next step: the Fermor app, with its waitlist. Below `lg` the four features are tabs above a phone.
// From `lg` the features scroll on the left while the phone stays put on the right and follows them.
import { useState } from 'react'
import { SECTION_IDS } from '../../data/links.js'
import { APP_FEATURES } from '../../data/products.js'
import { useActiveSection } from '../../hooks/useActiveSection.js'
import Badge from '../ui/Badge.jsx'
import Section from '../ui/Section.jsx'
import AlsoInTheWorks from './parts/AlsoInTheWorks.jsx'
import AppPhone from './parts/AppPhone.jsx'
import FeatureList, { FEATURE_ID_PREFIX } from './parts/FeatureList.jsx'
import FeatureTabs from './parts/FeatureTabs.jsx'
import WaitlistBlock from './parts/WaitlistBlock.jsx'

const FEATURE_ELEMENT_IDS = APP_FEATURES.map(
  (feature) => `${FEATURE_ID_PREFIX}${feature.id}`,
)

export default function AppShowcase() {
  const [activeId, setActiveId] = useState(APP_FEATURES[0].id)

  // On desktop, the feature crossing the middle of the screen decides which screen the phone shows.
  useActiveSection(FEATURE_ELEMENT_IDS, (elementId) =>
    setActiveId(elementId.replace(FEATURE_ID_PREFIX, '')),
  )

  return (
    <Section
      id={SECTION_IDS.app}
      tone="surface"
      eyebrow={<Badge>Coming soon</Badge>}
      title="Next: one app for all your money"
      intro="Invest, track and plan in one place, with answers based on your own numbers."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <FeatureTabs
            activeId={activeId}
            onChange={setActiveId}
            className="lg:hidden"
          />
          <FeatureList activeId={activeId} className="hidden lg:block" />
          <AlsoInTheWorks />
          <WaitlistBlock />
        </div>

        <div className="hidden lg:col-span-6 lg:block">
          <AppPhone featureId={activeId} className="sticky top-28" />
        </div>
      </div>
    </Section>
  )
}
