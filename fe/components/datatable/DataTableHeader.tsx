interface DataTableHeaderProps {
    title: string
    onAdd?: () => void
    onExport?: () => void
}

export default function DataTableHeader({
    title,
    onAdd,
    onExport,
}: DataTableHeaderProps) {
    return (
        <div className="row card-header flex-column flex-md-row border-bottom mx-0 px-3">
            {/* Left */}
            <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
                <h5 className="card-title mb-0 text-md-start text-center pb-md-0 pb-6">
                    {title}
                </h5>
            </div>

            {/* Right */}
            <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto mt-0">
                <div className="dt-buttons btn-group flex-wrap mb-0">
                    {/* Export */}
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn buttons-collection btn-label-primary dropdown-toggle me-4"
                            onClick={onExport}
                        >
                            <span className="d-flex align-items-center gap-2">
                                <i className="icon-base ti tabler-upload icon-xs me-sm-1" />
                                <span className="d-none d-sm-inline-block">Export</span>
                            </span>
                        </button>
                    </div>

                    {/* Add */}
                    <button
                        type="button"
                        className="btn create-new btn-primary"
                        onClick={onAdd}
                    >
                        <span className="d-flex align-items-center gap-2">
                            <i className="icon-base ti tabler-plus icon-sm" />
                            <span className="d-none d-sm-inline-block">Add New Record</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}
