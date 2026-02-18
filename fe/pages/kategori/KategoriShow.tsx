import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '@myreact/services/api'
import SelectInput from '../../components/SelectInput'

interface KategoriDetail {
    name: string
    saku_uuid: string
    type_id: string
    order: number
}

export default function Component() {
    const { uuid } = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState<KategoriDetail | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await api.get(`/pengaturan/kategori/${uuid}`)
                setData(res.data.data)
            } catch (err) {
                console.error(err)
                alert('Gagal mengambil detail kategori')
                navigate('/pengaturan/kategori')
            } finally {
                setLoading(false)
            }
        }

        fetchDetail()
    }, [uuid, navigate])


    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Detail Kategori</h5>
                    <small className="text-body-secondary">Informasi</small>
                </div>

                <div className="card-body">
                    {loading && <div className="container-p-y">Loading...</div>}
                    {!loading &&
                        <form>
                            {/* Saku */}
                            <SelectInput
                                label="Saku"
                                name="saku_uuid"
                                value={data.obj_saku.uuid}
                                disabled
                                apiUrl="/pengaturan/saku"
                                mapOption={(item) => ({
                                    value: item.uuid,
                                    label: item.name,
                                })}
                            />

                            {/* Nama */}
                            <div className="mb-4">
                                <label className="form-label">Nama Kategori</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={data.name}
                                    disabled
                                />
                            </div>

                            {/* Tipe */}
                            <SelectInput
                                label="Tipe"
                                name="type_id"
                                value={data.type}
                                disabled
                                options={[
                                    { value: '1', label: 'PENDAPATAN' },
                                    { value: '2', label: 'PENGELUARAN' },
                                ]}
                            />

                            {/* Urutan */}
                            <div className="mb-4">
                                <label className="form-label">Urutan</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={data.order}
                                    disabled
                                />
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => navigate("/pengaturan/kategori")}
                                >
                                    Kembali
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() =>
                                        navigate(`/pengaturan/kategori/${uuid}/edit`)
                                    }
                                >
                                    Edit
                                </button>
                            </div>
                        </form>}
                </div>
            </div>
        </div>
    )
}
