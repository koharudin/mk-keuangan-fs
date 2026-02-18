import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '@myreact/services/api'
import SelectInput from '../../components/SelectInput'

interface KategoriForm {
    name: string
    saku_uuid: string
    type_id: string
    order: number
}

export default function KategoriEdit() {
    const { uuid } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState<KategoriForm>({
        name: '',
        saku_uuid: '',
        type_id: '',
        order: 0,
    })

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)

    /* ===============================
       FETCH DETAIL
    =============================== */
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await api.get(`/pengaturan/kategori/${uuid}`)
                const data = res.data.data

                setForm({
                    name: data.name,
                    saku_uuid: data.obj_saku.uuid,
                    type_id: String(data.type),
                    order: data.order ?? 0,
                })
            } catch (err) {
                console.error(err)
                alert('Gagal mengambil data')
                navigate('/pengaturan/kategori')
            } finally {
                setFetching(false)
            }
        }

        fetchDetail()
    }, [uuid, navigate])

    /* ===============================
       HANDLE CHANGE
    =============================== */
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: name === 'order' ? Number(value) : value,
        }))
    }

    /* ===============================
       SUBMIT
    =============================== */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await api.put(
                `/pengaturan/kategori/${uuid}`,
                form
            )

            navigate('/pengaturan/kategori', {
                replace: true,
                state: {
                    success: res.data.message,
                    uuid,
                    ts: Date.now(),
                },
            })
        } catch (err) {
            console.error(err)
            alert('Gagal menyimpan perubahan')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Edit Kategori</h5>
                    <small className="text-body-secondary">Form Update</small>
                </div>

                <div className="card-body">
                    {fetching && <div className="container-p-y">Loading...</div>}
                    {!fetching &&
                        <form onSubmit={handleSubmit}>
                            {/* Saku */}
                            <SelectInput
                                label="Saku"
                                name="saku_uuid"
                                value={form.saku_uuid}
                                onChange={handleChange}
                                required
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
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>

                            {/* Tipe */}
                            <SelectInput
                                label="Tipe"
                                name="type_id"
                                value={form.type_id}
                                onChange={handleChange}
                                required
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
                                    name="order"
                                    value={form.order}
                                    onChange={handleChange}
                                    className="form-control"
                                    min={0}
                                    required
                                />
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Menyimpan...' : 'Update'}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => navigate(-1)}
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}
