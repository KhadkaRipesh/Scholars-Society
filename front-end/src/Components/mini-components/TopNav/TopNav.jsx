import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiSettings, FiLogOut } from "react-icons/fi";
import avatar from "./avatar.png";
import styles from "./TopNav.module.css";
import { NavLink, useNavigate } from "react-router-dom";

function DropdownItems(props) {
  return (
    <li className={styles.li_items} onClick={props.onClick}>
      <div className="icon">{props.icon}</div>
      <div className="text">{props.text}</div>
    </li>
  );
}

function TopNav() {
  const navigateTo = useNavigate();

  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const data = localStorage.getItem("userName");
    setUserName(data);
  }, []);
  function logout() {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("loggedIn");
    navigateTo("/signIn");
    window.location.reload();
  }
  return (
    <>
      <div className={styles.top_container}>
        <div className={styles.title}>
          <h2>Scholar'<span className={styles.view}>s</span> Society</h2>
        </div>
        <div className={styles.others}>
          <div className={styles.notification}>
            <div className={styles.icon}>{<IoMdNotificationsOutline />}</div>
            {/* <div className={styles.text}>Notification</div> */}
          </div>
          <div className={styles.profile}>
            <div
              className={styles.icon}
              onClick={() => {
                // console.log(open);
                setOpen(!open);
              }}
            >
              <img src={avatar} alt="img" style={{ height: 35, width: 35 }} />
            </div>
            {/* <div className={styles.text}>Profile</div> */}
          </div>
        </div>
      </div>
      <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
        <div className={styles.personal}>
          <div className="pp">
            <img src={avatar} alt="" style={{ height: 55, width: 55 }} />
          </div>
          <div className="pn">{userName}</div>
        </div>
        <div className={styles.line}></div>

        <ul>
          <NavLink to="/">
            <DropdownItems icon={<CgProfile />} text="My Profile" />
          </NavLink>
          <div className={styles.line}></div>
              <NavLink to="/signIn">
          <DropdownItems onClick={logout} icon={<FiLogOut />} text="Logout" />
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default TopNav;
