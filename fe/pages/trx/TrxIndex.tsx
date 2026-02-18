import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import DataTable from '../../components/datatable/DataTable'
import ActionDropdown from '../../components/dropdown/ActionDropdown'
import SelectInput from '../../components/SelectInput'

import { api } from '../../services/api'
import { confirmDelete } from '../../utils/confirmDelete'

export default function TransaksiIndex() {
    const location = useLocation()
    const navigate = useNavigate()

    const state = location.state as {
        success?: string
        uuid?: string
    }

    /* ===============================
       STATE
    =============================== */
    const [refreshKey, setRefreshKey] = useState(0)
    const [filters, setFilters] = useState({
        saku_uuid: '',
    })

    const reloadTable = () => {
        setRefreshKey((v) => v + 1)
    }

    /* ===============================
       FILTER HANDLER
    =============================== */
    const handleFilterChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFilters((prev) => ({ ...prev, [name]: value }))
        setRefreshKey((v) => v + 1)
    }

    const resetFilter = () => {
        setFilters({ saku_uuid: '' })
        setRefreshKey((v) => v + 1)
    }

    /* ===============================
       RENDER
    =============================== */
    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="card">
                {/* ===============================
                    FILTER
                =============================== */}
                <div className="card-header">
                    <div className="row g-3 align-items-end">
                        <div className="col-md-4">
                            <SelectInput
                                label="Saku"
                                name="saku_uuid"
                                value={filters.saku_uuid}
                                onChange={handleFilterChange}
                                apiUrl="/pengaturan/saku"
                                placeholder="-- Semua Saku --"
                                mapOption={(item) => ({
                                    value: item.uuid,
                                    label: item.name,
                                })}
                            />
                        </div>
                    </div>
                </div>

                {/* ===============================
                    TABLE
                =============================== */}
                <DataTable
                    title="Transaksi"
                    url="/transaksi"
                    refreshKey={refreshKey}
                    highlightUuid={state?.uuid}
                    flashMessage={state?.success}
                    params_external={{
                        saku_uuid:
                            filters.saku_uuid || undefined,
                    }}
                    onAdd={() => navigate('/transaksi/create')}
                    rowTemplate={(row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>

                              {/* Saku */}
                            <td>{row?.obj_saku?.name}</td>


                            {/* Tanggal */}
                            <td>
                                {new Date(row.waktu).toLocaleDateString(
                                    'id-ID'
                                )}
                            </td>

                            {/* Keterangan */}
                            <td>{row.keterangan}</td>

                            {/* Nominal */}
                            <td className="text-end">
                                {Number(row.total).toLocaleString('id-ID')}
                            </td>

                            {/* Tipe */}
                            <td>
                                <span
                                    className={`badge ${
                                        row.obj_kategori.type === 1
                                            ? 'bg-success'
                                            : 'bg-danger'
                                    }`}
                                >
                                    {row.obj_kategori.type === 1
                                        ? 'PENDAPATAN'
                                        : 'PENGELUARAN'}
                                </span>
                            </td>

                            {/* Action */}
                            <td>
                                <ActionDropdown
                                    items={[
                                        {
                                            label: 'Detail',
                                            onClick: () =>
                                                navigate(
                                                    `/transaksi/${row.uuid}`
                                                ),
                                        },
                                        {
                                            label: 'Edit',
                                            onClick: () =>
                                                navigate(
                                                    `/transaksi/${row.uuid}/edit`
                                                ),
                                        },
                                        { divider: true },
                                        {
                                            label: 'Remove',
                                            onClick: () =>
                                                confirmDelete(async () => {
                                                    await api.delete(
                                                        `/transaksi/${row.uuid}`
                                                    )
                                                    reloadTable()
                                                }),
                                        },
                                    ]}
                                />
                            </td>
                        </tr>
                    
                    )}
                    theadTemplate={() => (
                        <tr>
                          <th style={{ width: 60 }}>#</th>
                          <th>Saku</th>
                          <th>Tanggal</th>
                          <th>Keterangan</th>
                          <th className="text-end">Nominal</th>
                          <th>Tipe</th>
                          <th style={{ width: 80 }}>Action</th>
                        </tr>
                      )}
                />
            </div>
        </div>
    )
}
