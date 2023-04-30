import styles from "./Loader.module.scss";

const Loader = () => (
  <div className={styles.spinnerLoaderContainer}>
    <span className={styles.spinnerLoader} />
  </div>
);

export default Loader;
