import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import SelectInput from '../../components/SelectInput'

/* ===============================
   HELPER FORMAT RUPIAH
=============================== */
const formatRupiah = (value: string) => {
    const number = value.replace(/\D/g, '')
    return number
        ? new Intl.NumberFormat('id-ID').format(Number(number))
        : ''
}

export default function TransaksiCreate() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        waktu: '',
        keterangan: '',
        total: '', // numeric string
        saku_uuid: '',
        kategori_uuid: '',
    })

    const [totalView, setNominalView] = useState('') // formatted
    const [loading, setLoading] = useState(false)

    /* ===============================
       HANDLE CHANGE
    =============================== */
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleNominalChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const raw = e.target.value.replace(/\D/g, '')
        setForm((prev) => ({ ...prev, total: raw }))
        setNominalView(formatRupiah(raw))
    }

    /* ===============================
       SUBMIT
    =============================== */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await api.post('/transaksi', {
                ...form,
                total: Number(form.total),
            })

            navigate('/transaksi', {
                replace: true,
                state: {
                    success: res.data.message,
                    uuid: res.data.data.uuid,
                    ts: Date.now(),
                },
            })
        } catch (err) {
            console.error(err)
            alert('Gagal menyimpan transaksi')
        } finally {
            setLoading(false)
        }
    }

    /* ===============================
       RENDER
    =============================== */
    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="card">
                <div className="card-header">
                    <h5 className="mb-0">Tambah Transaksi</h5>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Saku */}
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
                         {/* Kategori */}
                         <SelectInput
                            label="Kategori"
                            name="kategori_uuid"
                            value={form.kategori_uuid}
                            onChange={handleChange}
                            required
                            apiUrl="/pengaturan/kategori"
                            placeholder="-- Pilih Kategori --"
                            mapOption={(item) => ({
                                value: item.uuid,
                                label: item.name,
                            })}
                        />

                        {/* Tanggal */}
                        <div className="mb-4">
                            <label className="form-label">Tanggal</label>
                            <input
                                type="date"
                                name="waktu"
                                value={form.waktu}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        {/* Nama */}
                        <div className="mb-4">
                            <label className="form-label">Nama Transaksi</label>
                            <input
                                type="text"
                                name="keterangan"
                                value={form.keterangan}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Contoh: Gaji, Belanja"
                                required
                            />
                        </div>

                        {/* Nominal (Currency) */}
                        <div className="mb-4">
                            <label className="form-label">Nominal</label>
                            <div className="input-group">
                                <span className="input-group-text">Rp</span>
                                <input
                                    type="text" name="total"
                                    value={totalView}
                                    onChange={handleNominalChange}
                                    className="form-control text-end"
                                    placeholder="0"
                                    required
                                />
                            </div>
                        </div>

                       
                        {/* ACTION */}
                        <div className="d-flex gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Menyimpan...' : 'Simpan'}
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
                </div>
            </div>
        </div>
    )
}
