import { Routes, Route } from "react-router-dom";
import Nav from "./Components/Pages/NavBar/Nav";
import Home from "./Components/Pages/Home/Home";
import Newsfeed from "./Components/Pages/Newsfeed/Newsfeed";
import Clubs from "./Components/Pages/Clubs/Clubs";
import About from "./Components/Pages/About/About";
import Calender from "./Components/Pages/Calender/Calender";
import { useEffect, useState } from "react";
import Signin from "./Components/SigninLogin/Signin";
import Register from "./Components/SigninLogin/Register";
import Privateroute from "./Components/Privateroute";
import Admin from "./Admin/admin";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState("");
  useEffect(() => {
    const data = localStorage.getItem("isAdmin");
    if (data === "Member") {
      setIsAuthenticated(data);
    }
  }, []);
  return (
    <div className="App">
      <div className="left">{isAuthenticated && <Nav />}</div>
      <div className="right">
        <Routes>
          <Route path="/" element={<Privateroute />}>
            <Route path="" element={<Home />} />
            <Route path="newsfeed" element={<Newsfeed />} />
            <Route path="clubs" element={<Clubs />} />
            <Route path="calender" element={<Calender />} />
            <Route path="about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>Page not found.</h1>} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
