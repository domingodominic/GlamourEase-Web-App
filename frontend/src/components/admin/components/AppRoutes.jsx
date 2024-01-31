import { Route, Routes } from "react-router-dom";
import Settings from "../pages/Settings";
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/settings" element={<Settings />}></Route>
    </Routes>
  );
}
export default AppRoutes;
