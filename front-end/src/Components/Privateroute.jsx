import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
function Privateroute() {
  const [loggedIn, setLoggedIn] = useState(" ");
  const [isAdmin, setIsAdmin] = useState(" ");

  useEffect(() => {
    const data = localStorage.getItem("loggedIn");
    setLoggedIn(data);

    const admin = localStorage.getItem("isAdmin");
    setIsAdmin(admin);
  }, []);
  if (loggedIn) {
    if (isAdmin == "Admin") {
      return <Navigate to="/admin" />;
    } else {
      return <Outlet />;
    }
  } else {
    return (
      <>
        <Navigate to={"/signin"} />
      </>
    );
  }
}

export default Privateroute;
