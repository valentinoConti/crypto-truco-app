import Head from "next/head";
import Image from "next/image";
import { Manrope } from "next/font/google";
import styles from "../index.module.scss";
import { useEffect, useState } from "react";
import { ComeBackArrow } from "@/components/ComeBackArrow";
import { Socket, io } from "socket.io-client";
import { SERVER_URL } from "@/constants";
import { useRouter } from "next/router";

const manrope = Manrope({ subsets: ["latin"] });

export default function Registro() {
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);

  const [loggerUser, setLoggedUser] = useState("");

  useEffect(() => {
    const currentUser = localStorage.getItem("loggedUser") ?? "";
    if (!currentUser) {
      router.replace("/");
      return;
    }
    setLoggedUser(currentUser);

    const newSocket = io(SERVER_URL, { withCredentials: true });
    setSocket(newSocket);

    newSocket.on("otherMessage", message => {
      console.log("message id", message.id);
      console.log("socket id", newSocket.id);
      console.log("user", message.user);

      if (message.id !== newSocket.id) {
        setOtherInput(message.user + ": " + message.value);
      }
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

      <div className={styles.container}>
        <ComeBackArrow />
        <div className={styles.logo}>
          <Image src="/banner.png" alt="CryptoTruco logo" width={300} height={160} priority />
        </div>

        <h2>CryptoTruco</h2>

        <div className={styles.separator} />

        <div>JUEGO TEST</div>

        <input
          value={userInput}
          onChange={ev => {
            setUserInput(ev.target.value);

            if (socket) {
              socket.emit("message", {
                id: socket.id,
                value: ev.target.value,
                user: loggerUser,
              });
            }
          }}
        />
        <input value={otherInput} readOnly />
      </div>
    </main>
  );
}
