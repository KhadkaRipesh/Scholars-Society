import { useNavigate } from "react-router-dom";
import styles from "./HomeCard.module.css";
export default function Card(props) {
  const navigate = useNavigate();
  const navToFeed = () => {
    navigate(props.to);
  };
  return (
    <>
      <div
        className={styles.container1}
        style={{ backgroundColor: props.color }}
      >
        <div className={styles.iconWithTable}>
          <p className={styles.icon}>{props.icon}</p>
          <p>{props.title}</p>
        </div>
        <div className={styles.subtitle}>
          <p>
            <span onClick={navToFeed}>Click here</span>
            {props.subtitle}
          </p>
        </div>
      </div>
    </>
  );
}
