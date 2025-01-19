import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage2 from "./pages/LoginPage2";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import RankingPage from "./pages/RankingPage";
function InnerApp() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage2 />} />
        <Route path="/dashboard/:userId" element={<DashboardPage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </>
  );
}

export default InnerApp;
