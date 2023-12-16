import Head from "next/head";
import Image from "next/image";
import { Manrope } from "next/font/google";
import styles from "../index.module.scss";
import { Fragment, useEffect, useRef, useState } from "react";
import { ComeBackArrow } from "@/components/ComeBackArrow";
import { Socket, io } from "socket.io-client";
import { SERVER_URL } from "@/constants";
import { useRouter } from "next/router";
import { infoToast } from "@/utils/toasts";
import FullscreenLoader from "@/components/FullscreenLoader";
import { StartGamePlus } from "@/components/StartGamePlus";
import Creating from "@/components/Creating";
import { IGame, TCard } from "@/utils/types";
import GameContainer from "@/components/GameContainer";
import Playing from "@/components/Playing";

const manrope = Manrope({ subsets: ["latin"] });

export default function Registro() {
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);

  const [loggedUser, setLoggedUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isWaitingOpponent, setIsWaitingOpponent] = useState(false);
  const [games, setGames] = useState<{ [key: string]: IGame }>({});
  const [gamePlaying, setGamePlaying] = useState<IGame | null>(null);
  const [cards, setCards] = useState<TCard[] | null>(null);

  const isDisconnected = useRef(true);

  // SOCKET CONNECTION AND SETTINGS:
  useEffect(() => {
    const currentUser = localStorage.getItem("loggedUser") ?? "";
    if (!currentUser) {
      router.replace("/");
      return;
    }

    const newSocket = io(SERVER_URL, { withCredentials: true });

    setTimeout(() => {
      if (isDisconnected.current) {
        localStorage.setItem("loggedUser", "");
        infoToast("No pudimos conectarnos, inicia sesión nuevamente", 4000, "socketNo");
        router.push("/");
      }
    }, 6500);

    newSocket.on("connect", () => {
      console.log("connected!");
      isDisconnected.current = false;

      setIsLoading(false);
      setSocket(newSocket);
    });

    newSocket.on("username", username => {
      localStorage.setItem("loggedUser", username);
      setLoggedUser(username);
    });

    newSocket.on("gamesAvailable", gamesAvailable => {
      console.log("gamesAvailable!", gamesAvailable);
      setGames(gamesAvailable);
      setIsWaitingOpponent(Object.keys(gamesAvailable).includes(newSocket.id));
    });

    newSocket.on("message", msg => {
      infoToast(msg, 5000, "serverInfo");
    });

    newSocket.on("updateGame", (game: IGame) => {
      setIsLoading(false);
      setGamePlaying(game);
    });

    newSocket.on("cards", (cards: any) => {
      setCards(cards);
    });

    newSocket.on("disconnect", _reason => {
      router.replace("/");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []); // eslint-disable-line

  const handleCreate = (flor: boolean, buenas: boolean, isUSDC: boolean, amount: number) => {
    const datos = { flor, buenas, isUSDC, amount };

    console.log("datos new game", datos);
    socket?.emit("createGame", datos);

    setIsCreating(false);
  };

  return (
    <main className={`${styles.main} ${manrope.className}`}>
      <Head>
        <title>CryptoTruco | Juego</title>
      </Head>

      {isLoading && <FullscreenLoader />}

      <div className={`${styles.container} ${styles.juego}`}>
        {socket && (
          <>
            {!!gamePlaying ? (
              <Playing socket={socket} game={gamePlaying} cards={cards} />
            ) : (
              <>
                <ComeBackArrow />
                {!isWaitingOpponent && (
                  <StartGamePlus
                    onClick={() => {
                      setIsCreating(true);
                    }}
                  />
                )}

                {isCreating && <Creating create={handleCreate} cancel={() => setIsCreating(false)} />}

                <div className={styles.topName}>{loggedUser}</div>

                <div className={styles.subtitle}>⬇️ Partidas disponibles ⬇️</div>

                <div className={styles.gamesContainer}>
                  {Object.entries(games).map(([gameSocketId, game]: [string, IGame]) => (
                    <GameContainer
                      game={game}
                      isOwnGame={game.creatorName === loggedUser}
                      key={game.creatorName}
                      cancelGame={() => {
                        socket?.emit("cancelGame");
                      }}
                      startGame={() => {
                        setIsLoading(true);
                        socket?.emit("joinGame", {
                          game,
                          gameSocketId,
                        });
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
