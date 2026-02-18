import { useRoutes } from "react-router-dom";
import kategoriRoutes from "@/routes/kategoriRoutes";
import dashboardRoutes from "./dashboardRoute";

const AllRoutes = () => {
    const routes = useRoutes([kategoriRoutes, dashboardRoutes]);
    return routes;
};

export default AllRoutes;
