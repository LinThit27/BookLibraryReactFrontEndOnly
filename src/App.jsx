import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LeftSidebar from "./components/LeftSidebar";
import BookRead from "./pages/BookRead";
import Login from "./pages/Login";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";
// axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <div className="root">
          <LeftSidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookRead />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
