import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../services/api'

/* ===============================
   HELPER FORMAT RUPIAH
=============================== */
const formatRupiah = (value: string | number) => {
  const num = String(value).replace(/\D/g, '')
  return num ? new Intl.NumberFormat('id-ID').format(Number(num)) : ''
}

export default function TransaksiDetail() {
  const navigate = useNavigate()
  const { uuid } = useParams<{ uuid: string }>()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  /* ===============================
     FETCH DETAIL
  =============================== */
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/transaksi/${uuid}`)
        setData(res.data.data)
      } catch (err) {
        console.error(err)
        alert('Gagal memuat detail transaksi')
        navigate(-1)
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [uuid])

  /* ===============================
     RENDER
  =============================== */
  if (loading) {
    return (
      <div className="container-xxl container-p-y">
        <div className="card p-4">Loading...</div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <h5 className="mb-0">Detail Transaksi</h5>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => navigate(-1)}
          >
            Kembali
          </button>
        </div>

        <div className="card-body">
          {/* Saku */}
          <div className="mb-4">
            <label className="form-label">Saku</label>
            <input
              type="text"
              className="form-control"
              value={data?.obj_saku?.name || '-'}
              disabled
            />
          </div>

          {/* Kategori */}
          <div className="mb-4">
            <label className="form-label">Kategori</label>
            <input
              type="text"
              className="form-control"
              value={data?.obj_kategori?.name || '-'}
              disabled
            />
          </div>

          {/* Tanggal */}
          <div className="mb-4">
            <label className="form-label">Tanggal</label>
            <input
              type="date"
              className="form-control"
              value={data?.waktu?.slice(0, 10)}
              disabled
            />
          </div>

          {/* Nama */}
          <div className="mb-4">
            <label className="form-label">Nama Transaksi</label>
            <input
              type="text"
              className="form-control"
              value={data?.keterangan}
              disabled
            />
          </div>

          {/* Nominal */}
          <div className="mb-4">
            <label className="form-label">Nominal</label>
            <div className="input-group">
              <span className="input-group-text">Rp</span>
              <input
                type="text"
                className="form-control text-end"
                value={formatRupiah(data?.total)}
                disabled
              />
            </div>
          </div>

          {/* Metadata (optional) */}
          <div className="row text-muted small mt-4">
            <div className="col-md-6">
              Dibuat: {new Date(data.created_at).toLocaleString('id-ID')} <br/>
              Oleh  : {data?.obj_user?.name}
            </div>
            <div className="col-md-6 text-md-end">
              Diubah: {new Date(data.updated_at).toLocaleString('id-ID')}
            </div>
          </div>

          {/* ACTION */}
          <div className="mt-4 d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/transaksi/${uuid}/edit`)}
            >
              Edit
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
