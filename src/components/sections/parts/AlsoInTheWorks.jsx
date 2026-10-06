// One line pointing at the two products that have no description yet. Both open their dialogs.
import SmartLink from '../../ui/SmartLink.jsx'

const LINK_CLASSES =
  'inline p-0 font-medium text-brand-700 underline underline-offset-4 hover:text-brand-800'

export default function AlsoInTheWorks() {
  return (
    <p className="mt-10 text-ink-700">
      Also in the works:{' '}
      <SmartLink productId="act" showBadge={false} className={LINK_CLASSES}>
        ACT
      </SmartLink>{' '}
      and{' '}
      <SmartLink productId="kids" showBadge={false} className={LINK_CLASSES}>
        Fermor for Kids
      </SmartLink>
      .
    </p>
  )
}
