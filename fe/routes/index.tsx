import { useRoutes } from 'react-router-dom';

import KategoriIndex from '../pages/kategori/KategoriIndex';
import KategoriCreate from '../pages/kategori/KategoriCreate';
import KategoriShow from '../pages/kategori/KategoriShow';
import KategoriEdit from '../pages/kategori/KategoriEdit';
import Dashboard from '../pages/Dashboard';
import BlankLayout from '../components/layouts/BlankLayout';
import Login from '../pages/auth/Login';
import VerticalLayout from '../components/layouts/VerticalLayout';
import NotFound from '../pages/NotFound';
import Logout from '../pages/auth/Logout';
import TrxIndex from '../pages/trx/TrxIndex';
import TrxCreate from '../pages/trx/TrxCreate';
import TrxShow from '../pages/trx/TrxShow';
import TrxEdit from '../pages/trx/TrxEdit';
import SakuIndex from '../pages/saku/SakuIndex';
import SakuCreate from '../pages/saku/SakuCreate';
import SakuShow from '../pages/saku/SakuShow';
import SakuEdit from '../pages/saku/SakuEdit';
import LaporanBulanan from '../pages/laporan/LaporanBulanan';
import RequireAuth from '../components/RequireAuth';
import OAuthCallback from '../pages/auth/OAuthCallback';

const AppRoutes = () => {
    return useRoutes([
        {
            element: <RequireAuth />,
            children: [
                {
                    element: <VerticalLayout />,
                    children: [
                        { path: '/', element: <Dashboard /> },
                    ],
                },
                {
                    path: 'transaksi', element: <VerticalLayout />,
                    children: [
                        { index: true, element: <TrxIndex /> },      // GET /Trx
                        { path: 'create', element: <TrxCreate /> },  // GET /Trx/create
                        { path: ':uuid', element: <TrxShow /> },       // GET /Trx/{id}
                        { path: ':uuid/edit', element: <TrxEdit /> },  // GET /Trx/{id}/edit
                    ],
                },
                {
                    path: 'pengaturan/kategori', element: <VerticalLayout />,
                    children: [
                        { index: true, element: <KategoriIndex /> },      // GET /kategori
                        { path: 'create', element: <KategoriCreate /> },  // GET /kategori/create
                        { path: ':uuid', element: <KategoriShow /> },       // GET /kategori/{id}
                        { path: ':uuid/edit', element: <KategoriEdit /> },  // GET /kategori/{id}/edit
                    ],
                },
                {
                    path: 'pengaturan/saku', element: <VerticalLayout />,
                    children: [
                        { index: true, element: <SakuIndex /> },      // GET /Saku
                        { path: 'create', element: <SakuCreate /> },  // GET /Saku/create
                        { path: ':uuid', element: <SakuShow /> },       // GET /Saku/{id}
                        { path: ':uuid/edit', element: <SakuEdit /> },  // GET /Saku/{id}/edit
                    ],
                },
                {
                    path: 'laporan', element: <VerticalLayout />,
                    children: [
                        { path: 'bulanan', element: <LaporanBulanan /> },  // GET /Saku/create
                    ],
                },
            ]
        },
        {
            element: <BlankLayout />,
            children: [
                { path: 'login', element: <Login /> },
                { path: 'logout', element: <Logout /> },
            ],
        },
        {
            element: <BlankLayout />,
            children: [
                { path: '*', element: <NotFound /> },
            ],
        },
        { path: 'oauth/callback', element: <OAuthCallback /> },
    ]);
};

export default AppRoutes;
