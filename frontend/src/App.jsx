import { BrowserRouter, Routes, Route } from "react-router-dom";


// pages & components
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import InnerApp from "./InnerApp";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <InnerApp/>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
