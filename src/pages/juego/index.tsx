import Head from "next/head";
import Image from "next/image";
import { Manrope } from "next/font/google";
import styles from "../index.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ComeBackArrow } from "@/components/ComeBackArrow";
import { Socket, io } from "socket.io-client";

const manrope = Manrope({ subsets: ["latin"] });

export default function Registro() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("localhost");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <main className={`${styles.main} ${manrope.className}`}>
      <div className={styles.container}>
        <ComeBackArrow />
        <div className={styles.logo}>
          <Image src="/banner.png" alt="CryptoTruco logo" width={300} height={160} />
        </div>

        <h2>CryptoTruco</h2>

        <div className={styles.separator} />

        <div>JUEGO TEST</div>
        <button
          onClick={() => {
            if (socket) {
              socket.emit("message", "holaa");
            } else {
              console.log("no socket to emit");
            }
          }}
        >
          HOLA
        </button>
      </div>
    </main>
  );
}
