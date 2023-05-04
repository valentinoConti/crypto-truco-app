import Head from "next/head";
import Image from "next/image";
import { Manrope } from "next/font/google";
import styles from "../index.module.scss";
import { useEffect, useRef, useState } from "react";
import { ComeBackArrow } from "@/components/ComeBackArrow";
import { Socket, io } from "socket.io-client";
import { SERVER_URL } from "@/constants";
import { useRouter } from "next/router";
import { infoToast } from "@/utils/toasts";
import FullscreenLoader from "@/components/FullscreenLoader";
import { StartGamePlus } from "@/components/StartGamePlus";
import Creating from "@/components/Creating";

const manrope = Manrope({ subsets: ["latin"] });

interface IGame {
  flor: boolean;
  buenas: boolean;
  isUSDC: boolean;
  amount: number;
  name?: string;
}

export default function Registro() {
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);

  const [loggerUser, setLoggedUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [createdGame, setCreatedGame] = useState(false);
  const [games, setGames] = useState<{ [key: string]: IGame }>({});

  const isDisconnected = useRef(true);

  // SOCKET CONNECTION AND SETTINGS:
  useEffect(() => {
    console.log("hola?");

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
      setCreatedGame(Object.keys(gamesAvailable).includes(newSocket.id));
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
            <ComeBackArrow />
            <StartGamePlus
              onClick={() => {
                setIsCreating(true);
              }}
            />

            {isCreating && <Creating create={handleCreate} cancel={() => setIsCreating(false)} />}

            <div className={styles.topName}>{loggerUser}</div>

            <div className={styles.subtitle}>⬇️ Partidas disponibles ⬇️</div>

            <div className={styles.gamesContainer}>
              {Object.values(games).map((game: IGame) => (
                <div key={game.name} className={styles.gameContainer}>
                  <span className={styles.bold}>{game.name}</span>
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
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
