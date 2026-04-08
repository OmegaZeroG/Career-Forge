import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import UploadResume from "./components/Resume/UploadResume";
import ResumeList from "./components/Resume/ResumeList";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/uploadresume" element={<UploadResume />} />
      <Route path="/resumes" element={<ResumeList />} />
    </Routes>
  );
}

export default App;