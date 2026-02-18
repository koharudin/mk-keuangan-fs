import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '@myreact/services/api'
import DataTableHeader from './DataTableHeader'
import DataTableToolbar from './DataTableToolbar'

import { useLocation, useNavigate } from 'react-router-dom'


interface DataTableProps<T> {
  url: string
  rowTemplate: (row: T) => React.ReactNode
  footerTemplate?: () => React.ReactNode
  title?: string,
  theadTemplate: () => React.ReactNode   // ⬅️ WAJIB
  flashMessage?: string,
  highlightUuid?: string,
  refreshKey?: number,
  onAdd?: () => void,
  params_external?: Record<string, any> // ⬅️ INI
}

type RowWithKey =
  | { id: number }
  | { uuid: string }

export default function DataTable<T extends RowWithKey>({
  url,
  rowTemplate,
  footerTemplate,
  onAdd,
  flashMessage,
  theadTemplate,
  highlightUuid,
  refreshKey,
  params_external = {}, // ⬅️ default object
  title = 'Data Table',
}: DataTableProps<T>) {

  const location = useLocation()
  const state = location.state
  const navigate = useNavigate()

  const [params, setParams] = useSearchParams()

  const page = Number(params.get('page') || 1)

  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [perPage, setPerPage] = useState(10)

  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  })

  const fetchData = async () => {
    setLoading(true)
    try {

      const finalParams = {
        params: {
          page,
          search,
          per_page: perPage,
          ...params_external, // ⬅️ FILTER DARI LUAR
        },
      }
      console.log(finalParams)
      const res = await api.get(url, finalParams)

      setData(res.data.data)
      setMeta({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
        per_page: res.data.per_page,
        total: res.data.total,
      })
    } catch (error) {
      console.error('DataTable fetch error:', error)

      // ⬇️ KOSONGKAN DATA JIKA ERROR
      setData([])
      setMeta({
        current_page: 1,
        last_page: 1,
        per_page: perPage,
        total: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, search, refreshKey, perPage, JSON.stringify(params_external)])

  const changePage = (p: number) => {
    setParams({ page: String(p) })
  }
  const isFresh = state?.ts && Date.now() - state.ts < 3000


  return (
    <div className="card">

      {isFresh && flashMessage && (
        <div className="alert alert-success mx-3 mt-3 mb-0">
          {flashMessage}
        </div>
      )}
      {/* Header */}
      <DataTableHeader title={title} onAdd={onAdd} />

     
      {/* Toolbar */}
      <DataTableToolbar
        perPage={perPage}
        search={search}
        onPerPageChange={value => {
          changePage(1)
          setPerPage(value)
        }}
        onSearchChange={value => {
          changePage(1)
          setSearch(value)
        }}
      />

      {/* Table */}
      <div className="justify-content-between dt-layout-table">
        <div className="d-md-flex justify-content-between align-items-center dt-layout-full table-responsive" style={{ overflow: 'visible' }}>
          <table className="datatables-basic table dtr-column">
            <thead>
              {theadTemplate()}
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={99} className="dt-empty">
                    Loading...
                  </td>
                </tr>
              ) : data?.length === 0 ? (
                <tr>
                  <td colSpan={99} className="dt-empty">
                    No data available
                  </td>
                </tr>
              ) : (
                data?.map(rowTemplate)
              )}
            </tbody>

            {footerTemplate && <tfoot>{footerTemplate()}</tfoot>}
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between p-3">
        <button
          className="btn btn-sm btn-secondary"
          disabled={meta?.current_page === 1}
          onClick={() => changePage(meta?.current_page - 1)}
        >
          Prev
        </button>

        <span>
          Page {meta?.current_page} / {meta?.last_page}
        </span>

        <button
          className="btn btn-sm btn-secondary"
          disabled={meta?.current_page === meta?.last_page}
          onClick={() => changePage(meta?.current_page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
