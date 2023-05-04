import Link from "next/link";
import styles from "./StartGamePlus.module.scss";

type Props = {
  onClick: () => void;
};

export const StartGamePlus = ({ onClick }: Props) => {
  return (
    <a className={styles.plusSign} onClick={onClick}>
      ➕
    </a>
  );
};
