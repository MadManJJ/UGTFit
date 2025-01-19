import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import InnerApp from "./InnerApp";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <InnerApp />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
