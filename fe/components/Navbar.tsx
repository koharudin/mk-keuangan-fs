import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { getToken } from "../utils/auth";
interface User {
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    api.get("me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.error("API error:", err);
        localStorage.removeItem("auth_token");
      });
  }, []);

  const handleMenuToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // TODO: toggle sidebar (body class / state / context)
  };

  const handleThemeToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // TODO: buka dropdown theme (jika tidak pakai bootstrap JS)
  };

  return (
    <nav
      id="layout-navbar"
      className="layout-navbar container-xxl navbar-detached navbar navbar-expand-xl align-items-center bg-navbar-theme"
    >
      {/* Mobile menu toggle */}
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a
          href="#"
          onClick={handleMenuToggle}
          className="nav-item nav-link px-0 me-xl-6"
        >
          <i className="icon-base ti tabler-menu-2 icon-md"></i>
        </a>
      </div>

      <div
        id="navbar-collapse"
        className="navbar-nav-right d-flex align-items-center justify-content-end"
      >
        {/* Theme switcher */}
        <div className="navbar-nav align-items-center">
          <div className="nav-item dropdown me-2 me-xl-0">
            <a
              href="#"
              onClick={handleThemeToggle}
              id="nav-theme"
              className="nav-link dropdown-toggle hide-arrow"
              data-bs-toggle="dropdown"
            >
              <i className="icon-base ti tabler-sun icon-md theme-icon-active"></i>
              <span className="d-none ms-2" id="nav-theme-text">
                Toggle theme
              </span>
            </a>

            <ul
              className="dropdown-menu dropdown-menu-start"
              aria-labelledby="nav-theme-text"
            >
              <li>
                <button
                  type="button"
                  className="dropdown-item align-items-center active"
                  data-bs-theme-value="light"
                  aria-pressed="false"
                >
                  <span>
                    <i className="icon-base ti tabler-sun icon-md me-3"></i>
                    Light
                  </span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="dropdown-item align-items-center"
                  data-bs-theme-value="dark"
                  aria-pressed="true"
                >
                  <span>
                    <i className="icon-base ti tabler-moon-stars icon-md me-3"></i>
                    Dark
                  </span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="dropdown-item align-items-center"
                  data-bs-theme-value="system"
                  aria-pressed="false"
                >
                  <span>
                    <i className="icon-base ti tabler-device-desktop-analytics icon-md me-3"></i>
                    System
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* User dropdown */}
        <ul className="navbar-nav flex-row align-items-center ms-md-auto">
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle hide-arrow p-0"
              data-bs-toggle="dropdown"
              onClick={(e) => e.preventDefault()}
            >
              <div className="avatar avatar-online">
                <img
                  src="/assets/img/avatars/1.png"
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </div>
            </a>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a href="#" className="dropdown-item">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img
                          src="/assets/img/avatars/1.png"
                          alt="User Avatar"
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0">{user?.name}</h6>
                      <small className="text-body-secondary">{user?.email}</small>
                    </div>
                  </div>
                </a>
              </li>

              <li>
                <div className="dropdown-divider my-1 mx-n2"></div>
              </li>

              <li>
                <a href="/logout" className="dropdown-item">
                  <i className="icon-base ti tabler-power icon-md me-3"></i>
                  <span>Log Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
