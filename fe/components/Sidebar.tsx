import React from "react";
import { useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // TODO: tambahkan logic toggle sidebar (class body / state / context)
  };

  const isActive = (path: string) => currentPath === path;

  return (
    <>
      <aside id="layout-menu" className="layout-menu menu-vertical menu">
        <div className="app-brand demo">
          <a href="/" className="app-brand-link">
            <span className="app-brand-logo demo">
              <span className="text-primary">
                {/* Logo SVG */}
                <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* paths */}
                </svg>
              </span>
            </span>
            <span className="app-brand-text demo menu-text fw-bold ms-3">
              KEUANGAN
            </span>
          </a>

          <a
            href="#"
            onClick={handleToggle}
            className="layout-menu-toggle menu-link text-large ms-auto"
          >
            <i className="icon-base ti menu-toggle-icon d-none d-xl-block"></i>
            <i className="icon-base ti tabler-x d-block d-xl-none"></i>
          </a>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">
          <li className={`menu-item ${isActive("/") ? "active" : ""}`}>
            <a href="/" className="menu-link">
              <i className="menu-icon icon-base ti tabler-smart-home"></i>
              <div>Dashboard</div>
            </a>
          </li>
          <li className={`menu-item ${isActive("/transaksi") ? "active" : ""}`}>
            <a href="/transaksi" className="menu-link">
              <i className="menu-icon icon-base ti tabler-smart-home"></i>
              <div>Transaksi Saya</div>
            </a>
          </li>
          <li className={`menu-item ${isActive("/laporan/bulanan") ? "active" : ""}`}>
            <a href="/laporan/bulanan" className="menu-link">
              <i className="menu-icon icon-base ti tabler-report"></i>
              <div>Laporan Bulanan</div>
            </a>
          </li>
          <li className={`menu-item ${isActive("/pengaturan/saku") ? "active" : ""}`}>
            <a href="/pengaturan/saku" className="menu-link">
              <i className="menu-icon icon-base ti tabler-app-window"></i>
              <div>Saku</div>
            </a>
          </li>

          <li className={`menu-item ${isActive("/pengaturan/kategori") ? "active" : ""}`}>
            <a href="/pengaturan/kategori" className="menu-link">
              <i className="menu-icon icon-base ti tabler-app-window"></i>
              <div>Kategori</div>
            </a>
          </li>
        </ul>
      </aside>

      {/* Mobile Toggler */}
      <div className="menu-mobile-toggler d-xl-none rounded-1">
        <a
          href="#"
          onClick={handleToggle}
          className="layout-menu-toggle menu-link text-large text-bg-secondary p-2 rounded-1"
        >
          <i className="ti tabler-menu icon-base"></i>
          <i className="ti tabler-chevron-right icon-base"></i>
        </a>
      </div>
    </>
  );
};

export default Sidebar;
