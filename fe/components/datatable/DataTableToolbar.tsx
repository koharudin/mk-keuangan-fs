interface DataTableToolbarProps {
    perPage: number
    onPerPageChange: (value: number) => void
    search: string
    onSearchChange: (value: string) => void
}

export default function DataTableToolbar({
    perPage,
    onPerPageChange,
    search,
    onSearchChange,
}: DataTableToolbarProps) {
    return (
        <div className="row mx-0 px-3 my-0 justify-content-between border-bottom">
            {/* Left: Show entries */}
            <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
                <div className="dt-length">
                    <label className="d-flex align-items-center gap-2">
                        Show
                        <select
                            className="form-select"
                            value={perPage}
                            onChange={e => onPerPageChange(Number(e.target.value))}
                        >
                            {[10, 25, 50, 100].map(v => (
                                <option key={v} value={v}>
                                    {v}
                                </option>
                            ))}
                        </select>
                        entries
                    </label>
                </div>
            </div>

            {/* Right: Search */}
            <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto mt-0">
                <div className="dt-search mt-0 mt-md-6 mb-6 d-flex align-items-center">
                    <label className="me-2">Search:</label>
                    <input
                        type="search"
                        className="form-control ms-4"
                        value={search}
                        onChange={e => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
