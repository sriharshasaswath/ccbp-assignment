import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import AddItem from "./components/AddItem";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/path" element={<Home />} />
        <Route exact path="/addItem" element={<AddItem />} />
      </Routes>
    </div>
  );
}

export default App;
