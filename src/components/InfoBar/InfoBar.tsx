import styles from "./InfoBar.module.scss";
const InfoBar = () => {
  return (
    <div className={styles.InfoBar}>
      <h1 className={styles.header}>There's plenty to do.</h1>
      <ul className={styles.instructions}>
        <li>
          <span className={styles.bold}>Create</span> a category for your todos,
          or jump straight in with the default category.
        </li>
        <li>
          <span className={styles.bold}>Check off</span> completed tasks using
          the left checkbox.
        </li>
        <li>
          <span className={styles.bold}>Edit or delete</span> a task using the
          buttons on the right.
        </li>
      </ul>
    </div>
  );
};

export default InfoBar;
