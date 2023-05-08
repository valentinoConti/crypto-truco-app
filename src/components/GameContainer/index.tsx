import { IGame } from "@/utils/types";
import styles from "@/pages/index.module.scss";
import Image from "next/image";
import { MouseEvent, useRef, useState } from "react";
import useClickOutside from "@/utils/useClickOutside";

type Props = {
  game: IGame;
  isOwnGame: boolean;
  cancelGame: () => void;
  startGame: () => void;
};

const GameContainer = ({ game, isOwnGame, cancelGame, startGame }: Props) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (ev: MouseEvent<HTMLDivElement>) => {
    if (isOwnGame) {
      setIsCanceling(!isCanceling);
    } else {
      setIsConfirming(!isConfirming);
    }
  };

  useClickOutside(containerRef, () => {
    setIsCanceling(false);
    setIsConfirming(false);
  });

  return (
    <div
      className={styles.gameContainer}
      onClick={handleClick}
      ref={containerRef}
      tabIndex={1}
      style={{
        background: isConfirming
          ? "rgba(0,0,255,0.1)"
          : isCanceling
          ? "rgba(255,0,0,0.1)"
          : isOwnGame
          ? "rgba(0,255,0,0.1)"
          : "rgba(0, 0, 0, 0.1)",
      }}
    >
      {isConfirming ? (
        <>
          <p>
            Aceptas jugar contra {game.creatorName} por {game.amount} {game.isUSDC ? "USDC" : "USDT"}?
          </p>
          <button onClick={startGame} style={{ backgroundColor: "rgba(0,255,0,0.2)" }}>
            JUGAR
          </button>
          <button style={{ backgroundColor: "rgba(255,0,0,0.2)" }}>Cancelar</button>
        </>
      ) : isCanceling ? (
        <>
          <p>Deseas cancelar tu partida?</p>
          <button onClick={cancelGame} style={{ backgroundColor: "rgba(150,0,0,0.2)" }}>
            Cancelar
          </button>
          <button style={{ backgroundColor: "rgba(50,0,0,0.2)" }}>No cancelar</button>
        </>
      ) : (
        <>
          <span className={styles.bold}>{game.creatorName}</span>
          <span>👉🏼 {game.flor ? "Con flor" : "Sin flor"}</span>
          <span>👉🏼 {game.buenas ? "15 Malas y 15 Buenas" : "18 Totales"}</span>
          <div className={styles.coin}>
            <span className={styles.bold}>${game.amount}</span>
            <Image
              alt={game.isUSDC ? "USDC" : "USDT"}
              src={game.isUSDC ? "/usdc.png" : "/usdt.png"}
              width={30}
              height={30}
            />
          </div>
          {isOwnGame && <span className={styles.waiting}>Esperando que un jugador se una...</span>}
        </>
      )}
    </div>
  );
};

export default GameContainer;
