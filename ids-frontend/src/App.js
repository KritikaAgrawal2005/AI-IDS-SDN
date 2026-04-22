import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 👇 FIRST PAGE */}
        <Route path="/" element={<Login />} />

        {/* 👇 AFTER LOGIN */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
