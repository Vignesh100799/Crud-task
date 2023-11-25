import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import User from "./components/User";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import CreateUser from "./components/CreateUser";
import ViewUser from "./components/ViewUser";
import EditUser from "./components/EditUser";
import { ToastContainer } from "react-toastify";



function App() {

  return(
   <BrowserRouter>
    <div id="wrapper">
        <Sidebar />
  
  <div id="content-wrapper" className="d-flex flex-column">
   
    <div id="content">
        <Topbar />
        <div className="container-fluid">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/" element={<User />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/create-user" element={<CreateUser />}></Route>
            <Route path="/view-user/:id" element={<ViewUser />}></Route>
            <Route path="/edit-user/:id" element={<EditUser />}></Route>

          </Routes>
          <ToastContainer/>
        </div>
        </div>
        </div>
        </div>
   </BrowserRouter>
  )
}

export default App;
