import { Outlet } from "react-router-dom";
import { CustomErrorBoundary } from "./ErrorBoundryUI";

import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <CustomErrorBoundary>
      <>
        <Navbar />
        <Outlet />
      </>
    </CustomErrorBoundary>
  );
};

export default MainLayout;
