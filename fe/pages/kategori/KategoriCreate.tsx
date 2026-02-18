import { useState } from 'react'
import { api } from '@myreact/services/api'

import { useNavigate, useLocation } from 'react-router-dom'
import SelectInput from '../../components/SelectInput'

export default function Component() {
    const navigate = useNavigate()
    const location = useLocation()

    const [form, setForm] = useState({
        name: '',
        saku_uuid: '',
        type_id: '',
        order: 0,
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
            const res = await api.post('/pengaturan/kategori', form)
            navigate('/pengaturan/kategori', {
                replace: true,
                state: {
                    success: res.data.message,
                    uuid: res.data.data.uuid,
                    ts: Date.now(),
                },
            })
            setForm({
                name: '',
                saku_uuid: '',
                type_id: '',
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
                <h5 className="mb-0">Entry Kategori</h5>
                <small className="text-body-secondary">Form Input</small>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {/* name */}
                    <SelectInput
                        label="Saku"
                        name="saku_uuid"
                        value={form.saku_uuid}
                        onChange={handleChange}
                        required
                        apiUrl="/pengaturan/saku"
                        placeholder="-- Pilih Saku --"
                        mapOption={(item) => ({
                            value: item.uuid,
                            label: item.name,
                        })}
                    />
                    <div className="mb-4">
                        <label className="form-label">Nama Kategori</label>
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
                                placeholder="nama kategori"
                                required
                            />
                        </div>
                    </div>
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
                   
                    <div className="mb-4">
                        <label className="form-label">Urutan</label>
                        <div className="input-group input-group-merge">
                            <span className="input-group-text">
                                <i className="icon-base ti tabler-sort-ascending" />
                            </span>
                            <input
                                type="number"
                                name="order"
                                value={form.order}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Urutan tampil"
                                min={0}
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
