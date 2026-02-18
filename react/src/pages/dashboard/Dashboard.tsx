const Dashboard = () => {
    return (
      <>
        <h4>Dashboard</h4>
        <p>Ringkasan data & statistik</p>
  
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h6>Total Transaksi</h6>
                <h3>128</h3>
              </div>
            </div>
          </div>
  
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h6>Total Kategori</h6>
                <h3>12</h3>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Dashboard;
  