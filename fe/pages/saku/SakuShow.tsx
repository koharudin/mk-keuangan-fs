import { useEffect, useState } from 'react'
import { api } from '@myreact/services/api'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

interface Saku {
  uuid: string
  name: string
  created_at: string
  updated_at: string
  // tambahkan field lain jika ada
}

export default function SakuDetail() {
  const navigate = useNavigate()
  const { uuid } = useParams<{ uuid: string }>()
  const location = useLocation()

  const [data, setData] = useState<Saku | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/pengaturan/saku/${uuid}`)
        setData(res.data.data) // asumsi API balikin { data: {...} }
      } catch (err: any) {
        console.error(err)
        setError('Gagal mengambil data')
      } finally {
        setLoading(false)
      }
    }

    if (uuid) fetchData()
  }, [uuid])
  if (error) return <p className="text-danger">{error}</p>

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Detail Saku</h5>
          <small className="text-body-secondary">Informasi lengkap</small>
        </div>

        <div className="card-body">
          {loading && <div className="container-p-y">Loading...</div>}
          {!loading && !data && <p>Data tidak ditemukan</p>}
          {!loading && data &&
            <form>
              {/* Nama Buku */}
              <div className="mb-3">
                <label className="form-label">Nama Buku</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.name}
                  readOnly
                />
              </div>

              {/* UUID */}
              <div className="mb-3">
                <label className="form-label">UUID</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.uuid}
                  readOnly
                />
              </div>

              {/* Created At */}
              <div className="mb-3">
                <label className="form-label">Dibuat Pada</label>
                <input
                  type="text"
                  className="form-control"
                  value={new Date(data.created_at).toLocaleString()}
                  readOnly
                />
              </div>

              {/* Updated At */}
              <div className="mb-3">
                <label className="form-label">Diperbarui Pada</label>
                <input
                  type="text"
                  className="form-control"
                  value={new Date(data.updated_at).toLocaleString()}
                  readOnly
                />
              </div>

              <button
                className="btn btn-secondary mt-2"
                onClick={() => navigate('/pengaturan/saku')}
              >
                Kembali
              </button>
            </form>
          }
        </div>
      </div>
    </div>
  )
}

