import { useEffect, useState } from "react";
import styles from "./Register.module.css";
import image from "./logo.webp";
import { NavLink, useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function Register() {
  const [data, setData] = useState({
    user: "Member",
    name: "",
    email: "",
    password: "",
  });
  const navigateTo = useNavigate();

  const handleChange = (event, field) => {
    setData({ ...data, [field]: event.target.value });
  };

  axios.defaults.headers.post["Content-Type"] = "application/json";
  const submit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/auth/register", data)
      .then((response) => {
        console.log(response);
        navigateTo("/signIn");
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
      <div className={styles.cont}>
        <div className={styles.left_pannel}>
          <img src={image} alt="" height={700} width={520} />
        </div>
        <div className={styles.right_pannel}>
          <ToastContainer />
          <div className={styles.auth}>
            <div className={styles.text}>Already got an account?</div>
            <div className={styles.box}>
              <NavLink to="/signIn">
                <p className={styles.login}>Login to Scholar's Society</p>
              </NavLink>
            </div>
          </div>
          <div className={styles.content}>
            <h3 className={styles.h3}>Register for FREE!</h3>
            <select onChange={(e) => handleChange(e, "user")} value={data.user}>
              <option value="Member">I am a member</option>
              <option value="Admin">I am an admin</option>
            </select>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              required
              onChange={(e) => handleChange(e, "name")}
              value={data.name}
            />
            <br />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
              required
              onChange={(e) => handleChange(e, "email")}
              value={data.email}
            />
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              required
              onChange={(e) => handleChange(e, "password")}
              value={data.password}
            />
            <input
              type="button"
              className="registerbutton"
              value="Create my account"
              onClick={submit}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
