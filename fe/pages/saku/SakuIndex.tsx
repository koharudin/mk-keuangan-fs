import DataTable from "../../components/datatable/DataTable";
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ActionDropdown from "../../components/dropdown/ActionDropdown";
import { api } from "../../services/api";
import { confirmDelete } from "../../utils/confirmDelete";

const SakuIndex = () => {
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
                url="/pengaturan/saku" flashMessage={state?.success}
                title="Saku" onAdd={() => {
                    navigate("/pengaturan/saku/create")
                }}
                theadTemplate={() => (
                    <tr>
                      <th style={{ width: 60 }}>#</th>
                      <th>Saku</th>
                      <th>UUID</th>
                      <th style={{ width: 80 }}>Action</th>S
                    </tr>
                  )}

                rowTemplate={row => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.uuid}</td>
                        <td><ActionDropdown
                            items={[
                                {
                                    label: 'Detail', onClick: () => {
                                        navigate(`/pengaturan/saku/${row.uuid}`)
                                    }
                                },
                                {
                                    label: 'Edit',
                                    onClick: () =>
                                        navigate(`/pengaturan/saku/${row.uuid}/edit`),
                                },
                                { divider: true },
                                {
                                    label: 'Remove', onClick: () => {
                                        confirmDelete(async () => {
                                            await api.delete(`/pengaturan/saku/${row.uuid}`)
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
export default SakuIndex;
