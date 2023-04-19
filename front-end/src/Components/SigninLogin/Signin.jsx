import { useState } from "react";
import Nav from "../Pages/NavBar/Nav";
import styles from "./Signin.module.css";
import image from "./logo.webp";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigateTo = useNavigate();

  const handleChange = (event, field) => {
    setLogin({ ...login, [field]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/auth/login", login)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(response.data.token); // log the entire response data object
        const user = response.data.role;
        console.log(user);
        localStorage.setItem("loggedIn", response.data.token);
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("isAdmin", response.data.role);
        if (user == "Admin") {
          navigateTo("/admin");
          window.location.reload();
        } else {
          navigateTo("/");
          window.location.reload();
        }
        // Set Authorization header in axios
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorMessages = error.response.data.errors.map(
            (error) => error.message
          );
          errorMessages.forEach((errorMessage) => {
            toast.error(errorMessage);
          });
        }
      });
  };
  return (
    <>
      <ToastContainer />
      <div className={styles.cont}>
        <div className={styles.left_pannel}>
          <img src={image} alt="" height={700} width={520} />
        </div>
        <div className={styles.right_pannel}>
          <div className={styles.auth}>
            <div className="text">Don't have an account?</div>
            <NavLink to="/register">
              <p className={styles.text}>
                Register to begin an amazing journey!
              </p>
            </NavLink>
          </div>
          <div className={styles.content}>
            <h3 className={styles.h3}>Sign in to your account</h3>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
              required
              value={login.email}
              onChange={(e) => handleChange(e, "email")}
            />
            <br />
            <input
              type="password"
              name="psw"
              id="psw"
              placeholder="Enter Password"
              required
              value={login.password}
              onChange={(e) => handleChange(e, "password")}
            />
            <p className={styles.forget}>Forgot your password?</p>
            <input type="button" value="Sign In" onClick={handleFormSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
