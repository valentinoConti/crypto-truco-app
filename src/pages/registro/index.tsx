import Head from "next/head";
import Image from "next/image";
import { Manrope } from "next/font/google";
import styles from "../index.module.scss";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { ComeBackArrow } from "@/components/ComeBackArrow";
import Tooltip from "@/components/Tooltip";
import { errorToast, successToast } from "@/utils/toasts";
import FullscreenLoader from "@/components/FullscreenLoader";
import { useRouter } from "next/router";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { SERVER_URL } from "@/constants";

const manrope = Manrope({ subsets: ["latin"] });

export default function Registro() {
  const router = useRouter();

  const [isHuman, setIsHuman] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  const changeUsername = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value === "" || (ev.target.value.length <= 32 && /^[\w.]+$/i.test(ev.target.value))) {
      setUsername(ev.target.value);
    } else {
      errorToast("Caracter invalido ingresado", 2000, "badUser");
    }
  };

  const changePassword = (ev: ChangeEvent<HTMLInputElement>) => {
    setPassword(ev.target.value);
  };

  const changeEmail = (ev: ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.target.value);
  };

  const handleVerification = (token: string, ekey: string) => {
    console.log("token", token);
    console.log("ekey", ekey);

    // setIsHuman(true);
  };

  const handleRegister = async () => {
    if (isHuman && username && password && email) {
      setLoading(true);
      try {
        const response = await fetch(`${SERVER_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            email,
          }),
        });

        if (response.status !== 200) {
          errorToast(await response.text(), 3000, "signupError1");
        } else {
          setUsername("");
          setPassword("");
          setEmail("");
          successToast("Usuario registrado! Inicia sesión con tus credenciales", 3000, "signupOK");
          setTimeout(() => {
            setLoading(false);
          }, 1500);
          setTimeout(() => {
            router.replace("/");
          }, 3000);
        }
      } catch (e) {
        console.error("Algo salió mal registrando usuario", e);
        setLoading(false);
        errorToast("Algo salió mal registrando usuario", 2000, "signupError2");
      }
    } else {
      errorToast("Falta completar información", 2000, "missInfo");
    }
  };

  return (
    <main className={`${styles.main} ${manrope.className}`}>
      <div className={styles.container}>
        {isLoading && <FullscreenLoader />}

        <ComeBackArrow />
        <div className={styles.logo}>
          <Image src="/banner.png" alt="CryptoTruco logo" width={300} height={160} priority />
        </div>

        <h2>CryptoTruco</h2>

        {/* <div className={styles.separator} /> */}

        <div className={styles.inputTitle}>Nombre de usuario:</div>
        <input type="text" value={username} onChange={changeUsername} />

        <div className={styles.inputTitle}>Contraseña:</div>
        <input type="password" value={password} onChange={changePassword} />

        <Tooltip text="No tendras que verificarlo, pero si luego necesitas contactarte y no tienes acceso al correo no podremos ayudarte.">
          <div className={styles.inputTitle}>
            <span className={styles.question}>?</span>
            <span className={styles.bold}>Correo:</span>
          </div>
        </Tooltip>
        <input type="email" value={email} onChange={changeEmail} />

        <form>
          <HCaptcha
            sitekey="f5ceaaa7-3643-4b13-8ec5-9203014a7020"
            onVerify={(token, ekey) => {
              handleVerification(token, ekey);
            }}
          />
        </form>

        <button onClick={handleRegister} className={styles.registerBtn}>
          Registrarse
        </button>
      </div>
    </main>
  );
}
