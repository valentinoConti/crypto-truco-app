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

const manrope = Manrope({ subsets: ["latin"] });

export default function Registro() {
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);

  const [loggerUser, setLoggedUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const isDisconnected = useRef(true);

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

    newSocket.on("otherMessage", message => {
      console.log("message id", message.id);

      if (message.id !== newSocket.id) {
        setOtherInput(message.value);
      }
    });

    newSocket.on("disconnect", _reason => {
      router.replace("/");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []); // eslint-disable-line

  const [userInput, setUserInput] = useState("");
  const [otherInput, setOtherInput] = useState("");

  return (
    <main className={`${styles.main} ${manrope.className}`}>
      <Head>
        <title>CryptoTruco | Juego</title>
      </Head>

      {isLoading && <FullscreenLoader />}

      <div className={styles.container}>
        <ComeBackArrow />
        <div className={styles.logo}>
          <Image src="/banner.png" alt="CryptoTruco logo" width={300} height={160} priority />
        </div>

        <h2>CryptoTruco</h2>

        <div className={styles.separator} />

        <div>{loggerUser}</div>

        <input
          value={userInput}
          onChange={ev => {
            setUserInput(ev.target.value);

            if (socket) {
              socket.emit("message", {
                id: socket.id,
                value: ev.target.value,
              });
            }
          }}
        />
        <input value={otherInput} readOnly />
      </div>
    </main>
  );
}
