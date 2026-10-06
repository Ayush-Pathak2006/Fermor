// The centered column every part of the page sits in: 1200px wide, with side padding that grows by screen size.
import clsx from 'clsx'

/** Usage: <Container className="py-4">...</Container> */
export default function Container({ as: Tag = 'div', className, children }) {
  return (
    <Tag
      className={clsx(
        'mx-auto w-full max-w-300 px-4 md:px-6 lg:px-8',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
