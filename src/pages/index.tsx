import Head from "next/head";
import Image from "next/image";
import { Manrope } from "next/font/google";
import styles from "./index.module.scss";
import { useState } from "react";

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
  const [username, setUsername] = useState("invitado");

  return (
    <main className={`${styles.main} ${manrope.className}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/banner.png"
            alt="CryptoTruco logo"
            width={300}
            height={160}
          />
        </div>

        <h2>CryptoTruco</h2>

        <button>Un Jugador</button>
        <button>Dos jugadores</button>
        <button>Reglas</button>

        <div className={styles.separator} />

        <div>Usuario: {username}</div>
        <button>Iniciar Sesión</button>
        <button>Registrarse</button>

        <footer>Contactanos</footer>
      </div>
    </main>
  );
}
