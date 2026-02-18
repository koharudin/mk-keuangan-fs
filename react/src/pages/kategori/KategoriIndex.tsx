import { Link } from "react-router-dom";

const KategoriIndex = () => {
    return (
        <>
            <h4>Manajemen Kategori</h4>

            <Link to="/kategori/create" className="btn btn-primary mb-3">
                Tambah Kategori
            </Link>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Elektronik</td>
                        <td>
                            <Link to="/kategori/1" className="btn btn-sm btn-info me-2">
                                Detail
                            </Link>
                            <Link to="/kategori/1/edit" className="btn btn-sm btn-warning">
                                Edit
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default KategoriIndex;
