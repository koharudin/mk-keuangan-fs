import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import SelectInput from '../../components/SelectInput'
import { alertInfo } from '../../utils/confirmDelete'

interface LaporanItem {
    id: number
    waktu: string
    name: string | null
    total: number
    obj_kategori: {
        id: number
        name: string
        type: number
    }
}

export default function LaporanBulanan() {
    const [tahun, setTahun] = useState(new Date().getFullYear())
    const [bulan, setBulan] = useState(new Date().getMonth() + 1)
    const [saku, setSaku] = useState('')
    const [laporan, setLaporan] = useState<{
        total_pemasukan: number
        total_pengeluaran: number
        list_pemasukan: LaporanItem[]
        list_pengeluaran: Record<string, LaporanItem>
    }>({
        total_pemasukan: 0,
        total_pengeluaran: 0,
        list_pemasukan: [],
        list_pengeluaran: {},
    })
    const [loading, setLoading] = useState(false)

    const fetchLaporan = async () => {
        setLoading(true)
        try {
            if(!saku){
                setLaporan({
                    total_pemasukan: 0,
                    total_pengeluaran: 0,
                    list_pemasukan: [],
                    list_pengeluaran: {},
                })
                await alertInfo({ title: 'Perhatian', text: 'Pilih Saku', icon: 'warning', timer: 3000 })
                return;
            }
            const res = await api.post('/laporan/bulanan', {
                tahun,
                bulan,
                saku_uuid: saku || null,
            })
            setLaporan(res.data.data)
        } catch (err) {
            console.error(err)
            setLaporan({
                total_pemasukan: 0,
                total_pengeluaran: 0,
                list_pemasukan: [],
                list_pengeluaran: {},
            })
            alert('Gagal memuat laporan')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLaporan()
    }, [])

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        fetchLaporan()
    }

    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="card mb-4">
                <div className="card-header">
                    <h5 className="mb-0">Laporan Bulanan</h5>
                </div>
                <div className="card-body">
                    {/* FILTER FORM */}
                    <form className="row g-3 align-items-end" onSubmit={handleFilterSubmit}>
                        {/* Tahun */}
                        <div className="col-md-2">
                            <label className="form-label">Tahun</label>
                            <input
                                type="number"
                                className="form-control"
                                value={tahun}
                                onChange={e => setTahun(Number(e.target.value))}
                            />
                        </div>

                        {/* Bulan */}
                        <div className="col-md-2">
                            <label className="form-label">Bulan</label>
                            <select
                                className="form-select"
                                value={bulan}
                                onChange={e => setBulan(Number(e.target.value))}
                            >
                                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>

                        {/* Saku */}
                        <div className="col-md-4 d-flex flex-column justify-content-end">
                            <label className="form-label">Saku</label>
                            <SelectInput removeDiv={true}
                                value={saku}
                                onChange={e => setSaku(e.target.value)}
                                apiUrl="/pengaturan/saku"
                                placeholder="-- Semua Saku --"
                                mapOption={item => ({ value: item.uuid, label: item.name })}
                                className="form-select"
                            />
                        </div>

                        <div className="col-md-auto">
                            <button type="submit" className="btn btn-primary">Tampilkan</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* LAPORAN SUMMARY */}
            {loading ? (
                <div className="card p-4">Loading...</div>
            ) : (
                <>
                    <div className="card mb-4">
                        <div className="card-body d-flex justify-content-between">
                            <div>
                                <h6>Total Pemasukan</h6>
                                <p className="text-success fs-5">
                                    Rp {laporan.total_pemasukan.toLocaleString('id-ID')}
                                </p>
                            </div>
                            <div>
                                <h6>Total Pengeluaran</h6>
                                <p className="text-danger fs-5">
                                    Rp {laporan.total_pengeluaran.toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* TABEL PEMASUKAN */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h6 className="mb-0">Pemasukan</h6>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Nama</th>
                                        <th>Kategori</th>
                                        <th className="text-end">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {laporan.list_pemasukan.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="text-center">Tidak ada data</td>
                                        </tr>
                                    ) : (
                                        laporan.list_pemasukan.map(item => (
                                            <tr key={item.id}>
                                                <td>{new Date(item.waktu).toLocaleDateString('id-ID')}</td>
                                                <td>{item.keterangan}</td>
                                                <td>{item.obj_kategori.name}</td>
                                                <td className="text-end">{item.total.toLocaleString('id-ID')}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* TABEL PENGELUARAN */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h6 className="mb-0">Pengeluaran</h6>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Nama</th>
                                        <th>Kategori</th>
                                        <th className="text-end">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(laporan.list_pengeluaran).length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="text-center">Tidak ada data</td>
                                        </tr>
                                    ) : (
                                        Object.values(laporan.list_pengeluaran).map(item => (
                                            <tr key={item.id}>
                                                <td>{new Date(item.waktu).toLocaleDateString('id-ID')}</td>
                                                <td>{item.keterangan || '-'}</td>
                                                <td>{item.obj_kategori.name}</td>
                                                <td className="text-end">{item.total.toLocaleString('id-ID')}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
