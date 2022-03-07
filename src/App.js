import "./App.css";
import SignUp from "./pages/SignUp_page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home_page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
