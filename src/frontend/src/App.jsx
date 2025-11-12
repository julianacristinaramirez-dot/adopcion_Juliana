import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from './pages/Register'; 
import Login from "./pages/Login";
import LoginSuccess from "./pages/LoginSuccess";
import LoginError from './pages/LoginError';
import MatchQuiz from "./pages/Match";
import MatchResults from "./pages/MatchResults";
import PetsList from "./pages/PestList";
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/login-error" element={<LoginError />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/match-quiz" element={<MatchQuiz />} />
        <Route path="/match-results" element={<MatchResults />} />
        <Route path="/pets-list" element={<PetsList />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;