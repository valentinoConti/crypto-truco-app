import { IGame, IRockPaperScissors, TCard } from "@/utils/types";
import styles from "./Playing.module.scss";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { Card } from "../Card";

type Props = {
  game: IGame;
  socket: Socket<any>;
  cards: TCard[] | null;
};

const Playing = ({ game, socket, cards }: Props) => {
  const [rpsPlayed, setRpsPlayed] = useState<IRockPaperScissors>("");

  useEffect(() => {
    console.log("game cambió!", game);
  }, [game]);

  const rps = (which: "rock" | "paper" | "scissors") => {
    setRpsPlayed(which);
    socket?.emit("rockPaperScissors", { room: game.room, which });
  };

  return (
    <div className={styles.playing}>
      <h2>Partida</h2>
      <p>{game.creatorName}</p>
      <p>{game.joinedName}</p>

      {!cards && rpsPlayed && (
        <div>
          <div>Jugaste {rpsPlayed}...</div>
          {game.whosNext && <div>{game.whosNext} empieza!</div>}
        </div>
      )}
      {!cards && !rpsPlayed && (
        <div>
          <button onClick={() => rps("rock")}>PIEDRA</button>
          <button onClick={() => rps("paper")}>PAPEL</button>
          <button onClick={() => rps("scissors")}>TIJERA</button>
        </div>
      )}

      <div className={styles.cardsContainer}>{cards && cards.map(card => <Card key={card} card={card} />)}</div>
    </div>
  );
};

export default Playing;
