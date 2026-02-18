import { useParams } from "react-router-dom";

const KategoriEdit = () => {
  const { id } = useParams();

  return (
    <>
      <h4>Edit Kategori #{id}</h4>

      <form>
        <div className="mb-3">
          <label className="form-label">Nama Kategori</label>
          <input className="form-control" defaultValue="Elektronik" />
        </div>

        <button className="btn btn-primary">Update</button>
      </form>
    </>
  );
};

export default KategoriEdit;
