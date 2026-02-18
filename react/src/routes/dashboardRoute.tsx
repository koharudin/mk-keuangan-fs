import { RouteObject } from "react-router-dom";
import VerticalLayout from "@/@layouts/VerticalLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import MyLayout from "@/@layouts/MyLayout";

const dashboardRoutes: RouteObject = {
  path: "/",
  element: (
    <MyLayout>
      <Dashboard />
    </MyLayout>
  ),
};

export default dashboardRoutes;
