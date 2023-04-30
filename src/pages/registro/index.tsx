import Head from "next/head";
import Image from "next/image";
import { Manrope } from "next/font/google";
import styles from "../index.module.scss";
import { useState } from "react";
import Link from "next/link";
import { ComeBackArrow } from "@/components/ComeBackArrow";

const manrope = Manrope({ subsets: ["latin"] });

export default function Registro() {
  const [username, setUsername] = useState("invitado");

  return (
    <main className={`${styles.main} ${manrope.className}`}>
      <div className={styles.container}>
        <ComeBackArrow />
        <div className={styles.logo}>
          <Image
            src="/banner.png"
            alt="CryptoTruco logo"
            width={300}
            height={160}
          />
        </div>

        <h2>CryptoTruco</h2>

        <div className={styles.separator} />

        <div>TEST</div>
      </div>
    </main>
  );
}
