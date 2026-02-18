interface DataTableFooterProps {
    page: number
    perPage: number
    total: number
    lastPage: number
    onPageChange: (page: number) => void
  }
  
  export default function DataTableFooter({
    page,
    perPage,
    total,
    lastPage,
    onPageChange,
  }: DataTableFooterProps) {
    const from = total === 0 ? 0 : (page - 1) * perPage + 1
    const to = Math.min(page * perPage, total)
  
    return (
      <div className="row mx-3 justify-content-between">
        {/* Info */}
        <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
          <div className="dt-info" role="status" aria-live="polite">
            Showing {from} to {to} of {total} entries
          </div>
        </div>
  
        {/* Pagination */}
        <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto mt-0">
          <div className="dt-paging">
            <nav aria-label="pagination">
              <ul className="pagination mb-0">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => onPageChange(page - 1)}
                  >
                    Prev
                  </button>
                </li>
  
                {Array.from({ length: lastPage }).map((_, i) => {
                  const p = i + 1
                  return (
                    <li
                      key={p}
                      className={`page-item ${page === p ? 'active' : ''}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => onPageChange(p)}
                      >
                        {p}
                      </button>
                    </li>
                  )
                })}
  
                <li className={`page-item ${page === lastPage ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => onPageChange(page + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
  