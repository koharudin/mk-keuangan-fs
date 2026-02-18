import { useState } from 'react'
import { api } from '@myreact/services/api'

import { useNavigate, useLocation } from 'react-router-dom'

export function SakuCreate() {
    const navigate = useNavigate()
    const location = useLocation()

    const [form, setForm] = useState({
        name: '',
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await api.post('/pengaturan/saku', form)
            navigate('/pengaturan/saku', {
                replace: true,
                state: {
                  success: res.data.message,
                  uuid: res.data.data.uuid,
                  ts: Date.now(),
                },
              })
            setForm({
                name: '',
            })
        } catch (err) {
            console.error(err)
            alert('Gagal menyimpan data')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container-xxl flex-grow-1 container-p-y"> <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Entry Saku</h5>
                <small className="text-body-secondary">Form Input</small>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {/* name */}
                    <div className="mb-4">
                        <label className="form-label">Nama Buku</label>
                        <div className="input-group input-group-merge">
                            <span className="input-group-text">
                                <i className="icon-base ti tabler-user" />
                            </span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="nama buku"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </form>
            </div>
        </div></div>
    )
}

export default SakuCreate;
