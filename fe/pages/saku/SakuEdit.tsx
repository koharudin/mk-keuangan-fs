import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '@myreact/services/api'

interface KategoriForm {
    name: string
}

export default function SakuEdit() {
    const { uuid } = useParams<{ uuid: string }>()
    const navigate = useNavigate()

    const [form, setForm] = useState<KategoriForm>({
        name: '',
    })

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)

    /* =====================
     * GET DATA (DETAIL)
     * ===================== */
    useEffect(() => {
        if (!uuid) return

        const fetchData = async () => {
            try {
                const res = await api.get(`/pengaturan/saku/${uuid}`)
                setForm({
                    name: res.data.data.name,
                })
            } catch (err) {
                console.error(err)
                alert('Gagal mengambil data kategori')
                navigate('/pengaturan/saku')
            } finally {
                setFetching(false)
            }
        }

        fetchData()
    }, [uuid, navigate])

    /* =====================
     * HANDLE CHANGE
     * ===================== */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    /* =====================
     * SUBMIT UPDATE
     * ===================== */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!uuid) return

        setLoading(true)
        try {
            await api.put(`/pengaturan/saku/${uuid}`, form)

            navigate('/pengaturan/saku', {
                replace: true,
                state: {
                    success: 'Saku berhasil diperbarui',
                    uuid,
                    ts: Date.now(), // supaya flash message tidak stale
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
                <div className="card-header">
                    <h5 className="mb-0">Edit Saku</h5>
                </div>

                <div className="card-body">
                    {fetching && <p className="p-4">Loading...</p>}
                    {!fetching &&
                        <form onSubmit={handleSubmit}>
                            {/* Nama */}
                            <div className="mb-3">
                                <label className="form-label">Nama Saku</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={form.name}
                                    onChange={handleChange}
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
                                    onClick={() => navigate('/pengaturan/saku')}
                                >
                                    Batal
                                </button>
                            </div>
                        </form>}
                </div>
            </div>
        </div>
    )
}
