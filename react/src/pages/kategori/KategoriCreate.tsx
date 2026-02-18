const KategoriCreate = () => {
    return (
      <>
        <h4>Tambah Kategori</h4>
  
        <form>
          <div className="mb-3">
            <label className="form-label">Nama Kategori</label>
            <input className="form-control" />
          </div>
  
          <button className="btn btn-success">Simpan</button>
        </form>
      </>
    );
  };
  
  export default KategoriCreate;
  