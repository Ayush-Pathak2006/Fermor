// The hero's worked example: three real money decisions, each computed from its inputs.
// This is the page's one memorable element, Fermor's "show the full math" idea made visible.
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useState } from 'react'
import { EXAMPLES } from '../../data/examples.js'
import { buildExampleView } from '../../lib/examples.js'
import Reveal from '../ui/Reveal.jsx'
import ExamplePanel from './parts/ExamplePanel.jsx'

// Built once: the inputs never change, so the numbers do not need recomputing on every render.
const EXAMPLE_VIEWS = EXAMPLES.map(buildExampleView)

export default function DecisionPreview() {
  // The slow assembly plays once, on page load. After that, switching tabs re-assembles quickly.
  const [hasSwitchedTab, setHasSwitchedTab] = useState(false)

  return (
    <Reveal delay={0.1}>
      <div className="rounded-3xl border border-line bg-surface p-5 shadow-hero sm:p-6">
        <TabGroup onChange={() => setHasSwitchedTab(true)}>
          <TabList
            aria-label="Choose an example"
            className="flex gap-1 rounded-xl border border-line bg-paper p-1"
          >
            {EXAMPLE_VIEWS.map((view) => (
              <Tab
                key={view.id}
                className="min-h-11 flex-1 rounded-lg border border-transparent px-2 text-sm font-medium text-ink-700 hover:text-ink-900 data-selected:border-line-strong data-selected:bg-surface data-selected:font-semibold data-selected:text-ink-900"
              >
                {view.tabLabel}
              </Tab>
            ))}
          </TabList>

          <TabPanels className="mt-6">
            {EXAMPLE_VIEWS.map((view) => (
              <TabPanel key={view.id}>
                <ExamplePanel
                  view={view}
                  sequence={hasSwitchedTab ? 'switch' : 'load'}
                />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>

      <p className="mt-3 text-sm text-ink-500">
        Example numbers. Open a calculator to use your own.
      </p>
    </Reveal>
  )
}
