import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from './pages/Register'; 
import Login from "./pages/Login";
import LoginSuccess from "./pages/LoginSuccess";
import LoginError from './pages/LoginError';
import PetsList from "./pages/PetsList";
import MatchQuiz from "./pages/Match";
import MatchResults from "./pages/MatchResults";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/login-error" element={<LoginError />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/pets-list" element={<PetsList />} />
        <Route path="/match-quiz" element={<MatchQuiz />} />
        <Route path="/match-results" element={<MatchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;