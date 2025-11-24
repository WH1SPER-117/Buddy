// //import logo from './logo.svg';
// import './App.css';
// import Home from './Components/Home/Home';

// function App() {
//   return (
//     <div className="App">
//       <div>
//         <Home></Home>
//       </div>
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Header from "./Components/Home/Header";
import Home from "./Components/Home/Home";
import Footer from "./Components/Home/Footer";
import Login from "./Components/login/Login";
import { Container } from "react-bootstrap";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatPage from "./Pages/ChatPage";
import Room from "./Components/Room/Room";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
