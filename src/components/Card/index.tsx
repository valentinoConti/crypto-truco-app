import Link from "next/link";
import styles from "./Card.module.scss";
import { TCard } from "@/utils/types";
import Image from "next/image";

type Props = {
  card: TCard;
};

export const Card = ({ card }: Props) => {
  return (
    <div className={styles.cardComponent}>
      <Image width={150} height={250} src={`/cartas/${card}.png`} alt={card} />
    </div>
  );
};
