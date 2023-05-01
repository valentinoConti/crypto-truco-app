import Head from "next/head";
import Image from "next/image";
import { Manrope } from "next/font/google";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SERVER_URL } from "@/constants";

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
  const [username, setUsername] = useState("invitado");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem("loggedUser", "");
    router.reload();
  };

  return (
    <main className={`${styles.main} ${manrope.className}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/banner.png" alt="CryptoTruco logo" width={300} height={160} priority />
        </div>

        <h2>CryptoTruco</h2>

        <Link className={styles.button} href={"/juego"}>
          Jugar
        </Link>

        <Link
          className={styles.button}
          href={"/"}
          onClick={async () => {
            const asd = await fetch(`${SERVER_URL}/checkLogin`);

            const dsa = await asd.text();
            console.log(asd);
            console.log(dsa);
          }}
        >
          Reglas
        </Link>

        <div className={styles.separator} />

        <div>Usuario: {username}</div>

        {username === "invitado" ? (
          <>
            <Link className={styles.button} href={"/iniciarSesion"}>
              Iniciar Sesion
            </Link>

            <Link className={styles.button} href={"/registro"}>
              Registrarse
            </Link>
          </>
        ) : (
          <>
            <Link className={styles.button} href={"/"}>
              Billetera
            </Link>
            <button onClick={handleLogout} className={styles.button}>
              Cerrar Sesion
            </button>
          </>
        )}

        <footer>Contactanos</footer>
      </div>
    </main>
  );
}
