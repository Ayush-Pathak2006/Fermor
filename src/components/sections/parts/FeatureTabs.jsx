// Below `lg`: tabs for the four features, with the phone under them.
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { APP_FEATURES } from '../../../data/products.js'
import AppPhone from './AppPhone.jsx'

/** Props: `activeId`, `onChange(featureId)`. The parent owns the state so desktop and mobile stay in step. */
export default function FeatureTabs({ activeId, onChange, className }) {
  const selectedIndex = APP_FEATURES.findIndex(
    (feature) => feature.id === activeId,
  )

  return (
    <div className={className}>
      <TabGroup
        selectedIndex={selectedIndex}
        onChange={(index) => onChange(APP_FEATURES[index].id)}
      >
        <TabList
          aria-label="App features"
          className="flex gap-1 rounded-xl border border-line bg-paper p-1"
        >
          {APP_FEATURES.map((feature) => (
            <Tab
              key={feature.id}
              className="min-h-11 flex-1 rounded-lg border border-transparent px-1 text-sm font-medium text-ink-700 hover:text-ink-900 data-selected:border-line-strong data-selected:bg-surface data-selected:font-semibold data-selected:text-ink-900"
            >
              {feature.name}
            </Tab>
          ))}
        </TabList>

        <TabPanels className="mt-5">
          {APP_FEATURES.map((feature) => (
            <TabPanel key={feature.id}>
              <p className="text-body-lg text-ink-700">{feature.line}</p>
              <p className="mt-3 text-ink-700">
                <span className="font-medium text-ink-900">For example: </span>
                {feature.example}
              </p>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>

      <AppPhone featureId={activeId} className="mt-8" />
    </div>
  )
}
