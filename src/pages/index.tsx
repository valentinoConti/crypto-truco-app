import Image from "next/image";
import { Manrope } from "next/font/google";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SERVER_URL } from "@/constants";
import { infoToast } from "@/utils/toasts";

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

  const isLoggedIn = username !== "invitado";

  return (
    <main className={`${styles.main} ${manrope.className}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/banner.png" alt="CryptoTruco logo" width={300} height={160} priority />
        </div>

        <h2>CryptoTruco</h2>

        {isLoggedIn ? (
          <Link className={styles.button} href="/juego">
            Jugar
          </Link>
        ) : (
          <button
            className={styles.button}
            style={{ cursor: "not-allowed" }}
            onClick={() => {
              infoToast("Registrate para jugar 😉!", 2000, "registerToPlay");
            }}
          >
            Jugar
          </button>
        )}

        <Link
          className={styles.button}
          href={"/"}
          onClick={async () => {
            const asd = await fetch(`${SERVER_URL}/checkLogin`, {
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            });

            const dsa = await asd.text();
            console.log(asd);
            console.log(dsa);
          }}
        >
          Reglas
        </Link>

        <div className={styles.separator} />

        <div>Usuario: {username}</div>

        {isLoggedIn ? (
          <>
            <Link className={styles.button} href={"/"}>
              Billetera
            </Link>
            <button onClick={handleLogout} className={styles.button}>
              Cerrar Sesion
            </button>
          </>
        ) : (
          <>
            <Link className={styles.button} href={"/iniciarSesion"}>
              Iniciar Sesion
            </Link>

            <Link className={styles.button} href={"/registro"}>
              Registrarse
            </Link>
          </>
        )}

        <footer>Contactanos</footer>
      </div>
    </main>
  );
}
