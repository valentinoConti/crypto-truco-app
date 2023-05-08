import { IGame } from "@/utils/types";
import styles from "./Playing.module.scss";
import { useEffect, useState } from "react";

type Props = {
  game: IGame;
};

const Playing = ({ game }: Props) => {
  useEffect(() => {
    console.log("el jueguito", game);
  }, [game]);

  return (
    <div className={styles.playing}>
      <h2>Partida</h2>
      <h1>AMIGO</h1>
      <p>{game.creatorName}</p>
      <p>{game.joinedName}</p>
    </div>
  );
};

export default Playing;
