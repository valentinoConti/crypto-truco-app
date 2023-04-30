import Link from "next/link";
import styles from "./ComeBackArrow.module.scss";

type Props = {};

export const ComeBackArrow = ({}: Props) => {
  return (
    <Link href="/" className={styles.comeBackArrow}>
      ⬅
    </Link>
  );
};
