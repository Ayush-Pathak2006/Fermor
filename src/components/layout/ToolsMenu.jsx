// The "Tools" dropdown: the live tools on fermor.in and the CA Portal. All open in a new tab.
import { TOOLS_MENU } from '../../data/navigation.js'
import HeaderPopover from './HeaderPopover.jsx'
import MenuLink from './MenuLink.jsx'

export default function ToolsMenu() {
  return (
    <HeaderPopover label="Tools" panelClassName="w-96">
      {({ close }) => (
        <ul>
          {TOOLS_MENU.map((tool) => (
            <li key={tool.id}>
              <MenuLink
                href={tool.href}
                title={tool.label}
                description={tool.description}
                onClick={close}
              />
            </li>
          ))}
        </ul>
      )}
    </HeaderPopover>
  )
}
