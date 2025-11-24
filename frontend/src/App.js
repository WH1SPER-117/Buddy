import { Routes, Route } from "react-router-dom";
import Login from "./Components/login/Login";
import { Container } from "react-bootstrap";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatPage from "./Pages/ChatPage";
import Room from "./Components/Room/Room";
import SignIn from "./Components/login/SignIn";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
