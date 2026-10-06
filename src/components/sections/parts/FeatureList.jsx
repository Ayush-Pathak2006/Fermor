// Desktop only: the four app features, each tall enough that scrolling past one switches the phone.
import clsx from 'clsx'
import { APP_FEATURES } from '../../../data/products.js'

export const FEATURE_ID_PREFIX = 'feature-'

/** Props: `activeId`, the feature whose screen the phone is showing. */
export default function FeatureList({ activeId, className }) {
  return (
    <ul className={className}>
      {APP_FEATURES.map((feature) => {
        const isActive = feature.id === activeId
        return (
          <li
            key={feature.id}
            id={`${FEATURE_ID_PREFIX}${feature.id}`}
            className={clsx(
              'min-h-[45vh] border-l-2 py-2 pl-6 transition-colors duration-200 motion-reduce:transition-none',
              isActive ? 'border-brand-600' : 'border-line',
            )}
          >
            <h3 className="text-h3 font-semibold text-ink-900">
              {feature.name}
            </h3>
            <p className="mt-2 max-w-[44ch] text-body-lg text-ink-700">
              {feature.line}
            </p>
            <p className="mt-4 text-ink-700">
              <span className="font-medium text-ink-900">For example: </span>
              {feature.example}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
