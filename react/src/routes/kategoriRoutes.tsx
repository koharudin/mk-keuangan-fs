import { RouteObject } from "react-router-dom";
import VerticalLayout from "@layouts/VerticalLayout";

import KategoriIndex from "@/pages/kategori/KategoriIndex";
import KategoriCreate from "@/pages/kategori/KategoriCreate";
import KategoriEdit from "@/pages/kategori/KategoriEdit";
import KategoriShow from "@/pages/kategori/KategoriShow";

const kategoriRoutes: RouteObject = {
    path: "/kategori",
    element: (
        <VerticalLayout>
            <KategoriIndex />
        </VerticalLayout>
    ),
    children: [
        {
            path: "create",
            element: (
                <VerticalLayout>
                    <KategoriCreate />
                </VerticalLayout>
            ),
        },
        {
            path: ":id",
            element: (
                <VerticalLayout>
                    <KategoriShow />
                </VerticalLayout>
            ),
        },
        {
            path: ":id/edit",
            element: (
                <VerticalLayout>
                    <KategoriEdit />
                </VerticalLayout>
            ),
        },
    ],
};

export default kategoriRoutes;
