import Loader from "@/components/Loader";
import styles from "./FullscreenLoader.module.scss";
import { useEffect, useState } from "react";

export default function FullscreenLoader() {
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <div className={styles.fullscreenLoader} style={{ opacity }}>
      <Loader />
    </div>
  );
}
