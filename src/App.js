import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Create from "./components/Create";
import Navbar from "./components/Navbar";
import { Read } from "./components/Read";
import Update from "./components/Update";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Create />} />
          <Route exact path="/read" element={<Read />} />
          <Route exact path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
