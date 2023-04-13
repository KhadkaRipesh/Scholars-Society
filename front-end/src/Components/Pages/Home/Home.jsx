// import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Card from "../../mini-components/Cards/HomeCard";
import React, { useEffect, useState } from "react";
import { BiNews, BiCalendarEvent } from "react-icons/bi";
import { MdOutlineGroups2, MdOutlineInfo } from "react-icons/md";
import TopNav from "../../mini-components/TopNav/TopNav";
import Nav from "../NavBar/Nav";

function Home() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const data = localStorage.getItem("userName");
    setUserName(data);
  }, []);
  return (
    <>
      {/* <Nav /> */}
      <TopNav />
      <p className={styles.head}>
        Welcome <strong>{userName}</strong>, what would you like to do today?
      </p>
      <hr className={styles.footer} />
      <br />
      <div className={styles.cards}>
        <Card
          to="/newsfeed"
          icon={<BiNews />}
          title="Feed"
          subtitle=" to see the latest news and updates on your personalized newsfeed! Stay up-to-date with events and announcement."
          color="#F0F7F6"
        />
        <Card
          to="/clubs"
          icon={<MdOutlineGroups2 />}
          title="Clubs"
          subtitle=" to explore our selection of educational clubs and discover new opportunities to learn and grow."
          color="#F0F4FA"
        />
        <Card
          to="/calender"
          icon={<BiCalendarEvent />}
          title="Events & Calender"
          subtitle=" to view our events calendar and see what's happening in your college. Check out our events calendar today!"
          color="#F9F4F2"
        />
        <Card
          to="/about"
          icon={<MdOutlineInfo />}
          title="About Us"
          subtitle=" to explore our website and discover everything we have to offer. We're dedicated to providing the best possible experience for our users."
          color="#F5F2F9"
        />
      </div>
      {/* <hr className={styles.footer} /> */}
    </>
  );
}

export default Home;
