import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../services/api'
interface DashboardData {
    user: {
        name: string
    }
    jumlah_saku: number
    total_pemasukan_bulan_ini: number
    total_pengeluaran_bulan_ini: number
}

export default function Dashboard() {
    const navigate = useNavigate()
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get('/dashboard')
                setData(res.data.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboard()
    }, [])


    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="mb-4">Dashboard</h4>


            {loading && <div>Loading dashboard...</div>}
            {!loading && !data && <div>Data tidak tersedia</div>}
            {!loading &&
                <form> <div className="row g-4">
                    {/* Nama User */}
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <small className="text-muted">Nama User</small>
                                <h5 className="mb-0">{data.user.name}</h5>
                            </div>
                        </div>
                    </div>

                    {/* Jumlah Saku */}
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <small className="text-muted">Jumlah Saku</small>
                                <h5 className="mb-0">
                                    {data?.jumlah_saku == 0 && <a className="btn btn-sm btn-primary" style={{ color: "white" }} onClick={() => {
                                        navigate("pengaturan/saku");
                                    }}> Bikin Baru</a>}
                                    {data?.jumlah_saku?.toLocaleString('id-ID')}
                                </h5>
                            </div>
                        </div>
                    </div>

                    {/* Total Pemasukan */}
                    <div className="col-md-3">
                        <div className="card border-success">
                            <div className="card-body">
                                <small className="text-muted">Pemasukan Bulan Ini</small>
                                <h5 className="mb-0 text-success">
                                    Rp {data?.total_pemasukan_bulan_ini?.toLocaleString('id-ID')}
                                </h5>
                            </div>
                        </div>
                    </div>

                    {/* Total Pengeluaran */}
                    <div className="col-md-3">
                        <div className="card border-danger">
                            <div className="card-body">
                                <small className="text-muted">Pengeluaran Bulan Ini</small>
                                <h5 className="mb-0 text-danger">
                                    Rp {data?.total_pengeluaran_bulan_ini?.toLocaleString('id-ID')}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            }
        </div>
    )
}
