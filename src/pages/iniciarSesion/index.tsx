import Image from "next/image";
import { Manrope } from "next/font/google";
import styles from "../index.module.scss";
import { ChangeEvent, useState } from "react";
import { ComeBackArrow } from "@/components/ComeBackArrow";
import { errorToast, successToast } from "@/utils/toasts";
import FullscreenLoader from "@/components/FullscreenLoader";
import { useRouter } from "next/router";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { SERVER_URL } from "@/constants";
import Head from "next/head";

const manrope = Manrope({ subsets: ["latin"] });

export default function IniciarSesion() {
  const router = useRouter();

  const [captchaToken, setCaptchaToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async () => {
    if (captchaToken && username && password) {
      setLoading(true);

      try {
        const response = await fetch(`${SERVER_URL}/login`, {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            token: captchaToken,
          }),
        });

        if (response.status !== 200) {
          setLoading(false);
          errorToast(await response.text(), 3000, "loginError1");
          return;
        } else {
          setUsername("");
          setPassword("");
          setCaptchaToken("");

          successToast("Bienvenido!", 3000, "loginOK");
          localStorage.setItem("loggedUser", username);

          setLoading(false);
          router.replace("/");
        }
      } catch (e) {
        console.error("Algo salió mal iniciando sesión", e);
        setLoading(false);
        errorToast("Algo salió mal iniciando sesión", 2000, "loginError2");
      }
    } else {
      errorToast("Falta completar información", 2000, "missInfo");
    }
  };

  return (
    <main className={`${styles.main} ${manrope.className}`}>
      <Head>
        <title>CryptoTruco | Iniciar Sesion</title>
      </Head>

      <div className={styles.container}>
        {isLoading && <FullscreenLoader />}

        <ComeBackArrow />
        <div className={styles.logo}>
          <Image src="/banner.png" alt="CryptoTruco logo" width={300} height={160} priority />
        </div>

        <h2>Iniciar Sesion</h2>

        <div className={styles.inputTitle}>Nombre de usuario:</div>
        <input type="text" value={username} onChange={changeUsername} />

        <div className={styles.inputTitle}>Contraseña:</div>
        <input type="password" value={password} onChange={changePassword} />

        {!isLoading && (
          <form>
            <HCaptcha sitekey="f5ceaaa7-3643-4b13-8ec5-9203014a7020" onVerify={setCaptchaToken} />
          </form>
        )}

        <button onClick={handleLogin} className={styles.registerBtn}>
          Iniciar Sesion
        </button>
      </div>
    </main>
  );
}
