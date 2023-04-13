import styles from "./News.module.css";
function News(props) {
  return (
    <>
      <div className={styles.news_container}>
        <div className={styles.title_container}>
          <h2>{props.title}</h2>
        </div>
        <div className={styles.description_container}>
          <p>{props.description}</p>
          <p className={styles.creator}>Posted by: {props.poster}</p>
        </div>
      </div>
    </>
  );
}

export default News;
