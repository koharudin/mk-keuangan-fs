import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../services/api'
import SelectInput from '../../components/SelectInput'

/* ===============================
   HELPER FORMAT RUPIAH
=============================== */
const formatRupiah = (value: string | number) => {
  const num = String(value).replace(/\D/g, '')
  return num ? new Intl.NumberFormat('id-ID').format(Number(num)) : ''
}

export default function TransaksiEdit() {
  const navigate = useNavigate()
  const { uuid } = useParams<{ uuid: string }>()

  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  const [form, setForm] = useState({
    waktu: '',
    name: '',
    total: '', // numeric string
    saku_uuid: '',
    kategori_uuid: '',
  })

  const [totalView, setTotalView] = useState('')

  /* ===============================
     FETCH DETAIL
  =============================== */
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/transaksi/${uuid}`)

        const data = res.data.data

        setForm({
          waktu: data.waktu?.slice(0, 10), // yyyy-mm-dd
          keterangan: data.keterangan,
          total: String(data.total),
          saku_uuid: data?.obj_saku?.uuid,
          kategori_uuid: data?.obj_kategori?.uuid,
        })
        setTotalView(formatRupiah(data.total))
      } catch (err) {
        console.error(err)
        alert('Gagal memuat data transaksi')
        navigate(-1)
      } finally {
        setLoadingData(false)
      }
    }

    fetchDetail()
  }, [uuid])

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
    setTotalView(formatRupiah(raw))
  }

  /* ===============================
     SUBMIT
  =============================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await api.put(`/transaksi/${uuid}`, {
        ...form,
        total: Number(form.total),
      })

      navigate('/transaksi', {
        replace: true,
        state: {
          success: res.data.message,
          uuid,
          ts: Date.now(),
        },
      })
    } catch (err) {
      console.error(err)
      alert('Gagal mengupdate transaksi')
    } finally {
      setLoading(false)
    }
  }

  /* ===============================
     RENDER
  =============================== */
  if (loadingData) {
    return (
      <div className="container-xxl container-p-y">
        <div className="card p-4">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Edit Transaksi</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Saku */}
            <SelectInput
              label="Saku"
              name="saku_uuid"
              value={form?.saku_uuid}
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
              value={form?.kategori_uuid}
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
                required
              />
            </div>
            {/* Nominal */}
            <div className="mb-4">
              <label className="form-label">Nominal</label>
              <div className="input-group">
                <span className="input-group-text">Rp</span>
                <input
                  type="text"
                  name="total"
                  value={totalView}
                  onChange={handleNominalChange}
                  className="form-control text-end"
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
        </div>
      </div>
    </div>
  )
}
