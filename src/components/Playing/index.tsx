import { ICards, IGame, IRockPaperScissors, TCard } from "@/utils/types";
import styles from "./Playing.module.scss";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { Card } from "../Card";

type Props = {
  game: IGame;
  socket: Socket<any>;
  cards: ICards | null;
};

const Playing = ({ game, socket, cards }: Props) => {
  const [rpsPlayed, setRpsPlayed] = useState<IRockPaperScissors>("");

  useEffect(() => {
    console.log("game cambió!", game);

    // Reset local RPS state when server resets RPS after a tie
    if (game.rps?.creator === "" && game.rps?.joined === "") {
      setRpsPlayed("");
    }
  }, [game]);

  const rps = (which: "rock" | "paper" | "scissors") => {
    setRpsPlayed(which);
    socket?.emit("rockPaperScissors", { room: game.room, which });
  };

  const playCard = (card: TCard) => {
    socket?.emit("playCard", { room: game.room, card });
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

      <div className={styles.cardsContainer}>
        {cards && (
          <>
            <div className={styles.opponentTable}>
              {cards?.opponentTable?.map(card => (
                <div className={styles.card} key={card}>
                  <Card key={card} card={card} />
                </div>
              ))}
            </div>

            <div className={styles.myTable}>
              {cards?.myTable?.map(card => (
                <div className={styles.card} key={card}>
                  <Card key={card} card={card} />
                </div>
              ))}
            </div>

            <div className={styles.hand}>
              {cards?.hand?.map(card => (
                <div className={styles.card} key={card} onClick={() => playCard(card)}>
                  <Card key={card} card={card} />
                </div>
              ))}
            </div>

            {cards?.whosNext && <div className={styles.turnIndicator}>{cards.whosNext} juega</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default Playing;
