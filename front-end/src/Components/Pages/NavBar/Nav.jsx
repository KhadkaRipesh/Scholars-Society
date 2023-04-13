import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

// importing icons
import { RxDashboard } from "react-icons/rx";
import { AiOutlineTeam, AiOutlineCalendar } from "react-icons/ai";
import { MdOutlineSchool } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";

const routes = [
  {},
  { path: "/", icon: <RxDashboard />, text: "Home" },
  { path: "/newsfeed", icon: <TfiAnnouncement />, text: "Newsfeed" },
  { path: "/clubs", icon: <AiOutlineTeam />, text: "My Clubs" },
  { path: "/calender", icon: <AiOutlineCalendar />, text: "Calender" },
  { path: "/about", icon: <MdOutlineSchool />, text: "About" },
];
function Nav() {
  return (
    <div className="container">
      <section className={styles.icon_lists}>
        {routes.map((route, index) => {
          return (
            <NavLink
              key={index}
              to={route.path}
              className={({ isActive }) => {
                let str = `${styles.nav}`;
                if (isActive) str += ` ${styles.navActive}`;
                return str;
              }}
            >
              <div className={styles.indi_div}>
                <div className={styles.icon}>{route.icon}</div>
                <div className={styles.text}>{route.text}</div>
              </div>
            </NavLink>
          );
        })}
      </section>
    </div>
  );
}

export default Nav;
