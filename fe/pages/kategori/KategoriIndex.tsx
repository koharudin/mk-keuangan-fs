import DataTable from "../../components/datatable/DataTable";
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ActionDropdown from "../../components/dropdown/ActionDropdown";
import { api } from "../../services/api";
import { confirmDelete } from "../../utils/confirmDelete";

export default function Component()  {
    const location = useLocation()
    const navigate = useNavigate()

    const state = location.state as {
        success?: string
        uuid?: string
    }
    const [refreshKey, setRefreshKey] = useState(0)

    const reloadTable = () => {
        setRefreshKey(v => v + 1)
    }

    return <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
            <DataTable highlightUuid={state?.uuid} refreshKey={refreshKey}
                url="/pengaturan/kategori" flashMessage={state?.success}
                title="Kategori" onAdd={() => {
                    navigate("/pengaturan/kategori/create")
                }}
                theadTemplate={() => (
                    <tr>
                      <th style={{ width: 60 }}>#</th>
                      <th>Name</th>
                      <th>Saku</th>
                      <th>Tipe</th>
                      <th>UUID</th>
                      <th style={{ width: 80 }}>Action</th>S
                    </tr>
                  )}
                rowTemplate={row => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row?.obj_saku?.name}</td>
                         {/* Tipe */}
                         <td>
                                <span
                                    className={`badge ${
                                        row.type === 1
                                            ? 'bg-success'
                                            : 'bg-danger'
                                    }`}
                                >
                                    {row.type === 1
                                        ? 'PENDAPATAN'
                                        : 'PENGELUARAN'}
                                </span>
                            </td>
                        <td>{row.uuid}</td>
                        <td><ActionDropdown
                            items={[
                                {
                                    label: 'Detail', onClick: () => {
                                        navigate(`/pengaturan/kategori/${row.uuid}`)
                                    }
                                },
                                {
                                    label: 'Edit',
                                    onClick: () =>
                                        navigate(`/pengaturan/kategori/${row.uuid}/edit`),
                                },
                                { divider: true },
                                {
                                    label: 'Remove', onClick: () => {
                                        confirmDelete(async () => {
                                            await api.delete(`/pengaturan/kategori/${row.uuid}`)
                                            reloadTable()
                                        })
                                    }
                                },
                            ]} /></td>
                    </tr>
                )}></DataTable>
        </div>
    </div>
};
