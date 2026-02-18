interface DropdownItem {
  label: string
  href?: string
  onClick?: () => void
  divider?: boolean
}

interface ActionDropdownProps {
  items: DropdownItem[]
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({ items }) => {
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-primary btn-icon rounded-pill dropdown-toggle hide-arrow waves-effect waves-light"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="ti tabler-dots-vertical" style={{ color: 'white' }}></i>
      </button>

      <ul className="dropdown-menu dropdown-menu-end">
        {items.map((item, idx) =>
          item.divider ? (
            <li key={idx}>
              <hr className="dropdown-divider" />
            </li>
          ) : (
            <li key={idx}>
              <a
                className="dropdown-item waves-effect"
                href={item.href ?? '#'}
                onClick={item.onClick}
              >
                {item.label}
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default ActionDropdown
