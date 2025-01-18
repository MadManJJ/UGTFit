import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage2 from "./pages/LoginPage2";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
function InnerApp() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage2 />} />
        <Route path="/dashboard/:userId" element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default InnerApp;
