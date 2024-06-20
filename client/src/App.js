import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from "./pages/Home";
import Users from "./pages/Users";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import EditUser from './pages/editUser';
import ViewUser from './pages/viewUser';
import Signup from './pages/Signup';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      
        <Route index element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/editUser/:id" element={<EditUser />} />
        <Route path="/viewUser/:id" element={<ViewUser />} />
     
    </Routes>
  </BrowserRouter>
  );
}

export default App;
