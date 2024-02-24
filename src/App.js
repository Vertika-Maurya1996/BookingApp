import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import BookNow from "./components/BookNow"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./utilities/ProtectedRoutes";
import BookingList from "./components/Bookings"
import HomeDriver from "./pages/HomeDriver"

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./components/UserProfile";
import DriverRoutes from "./utilities/DriverRoutes";

function App() {
  let userType = localStorage.getItem('userType')
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register-user" element={<Register />} />
          <Route path="/login-driver" element={<Login />} />
          <Route path="/register-driver" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
           <Route>
           <Route path="/home" element={<Home/>}/>
           <Route path="/book" element={<BookNow/>}/>
           <Route path="/booking-list" element={<BookingList/>}/>
           <Route path="/profile-user" element={<UserProfile/>}/>
           </Route>
          </Route>
          <Route element={<DriverRoutes/>}>
          <Route path="/home-driver" element={<HomeDriver/>}/>
           <Route path="/profile-driver" element={<UserProfile/>}/>
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
        />
      </Router>
    </div>
  );
}

export default App;
