import Image from "next/image";
import styles from "./Creating.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { infoToast } from "@/utils/toasts";

type Props = {
  cancel: () => void;
  create: (flor: boolean, buenas: boolean, isUSDC: boolean, amount: number) => void;
};

const Creating = ({ cancel, create }: Props) => {
  const [top, setTop] = useState("-100vh");
  const [apuesta, setApuesta] = useState("0");
  const [conFlor, setConFlor] = useState(false);
  const [conBuenas, setConBuenas] = useState(true);
  const [isUSDC, setIsUSDC] = useState(false);

  useEffect(() => {
    setTop("0vh");
  }, []);

  const handleApuesta = (ev: ChangeEvent<HTMLInputElement>) => {
    const newApuesta = ev.target.value;

    if (+newApuesta > 200) {
      infoToast("No se puede apostar más de 200 🙏🏼", 2500, "masde200");
      setApuesta("200");
      return;
    }
    if (+newApuesta < 0) {
      setApuesta("0");
      return;
    }

    // TODO checkear que no apueste más de lo que tiene, etc..

    setApuesta(newApuesta.replace(/^0+(?!$)/, ""));
  };

  const handleClose = () => {
    setTop("-100vh");
    setTimeout(cancel, 350);
  };

  return (
    <div className={styles.creating} style={{ top: top }}>
      <h2>Crear Partida</h2>

      <div className={styles.option}>
        <div>
          <input
            type="radio"
            value={conFlor ? "con" : "sin"}
            checked={!conFlor}
            name="flor"
            onChange={() => {
              setConFlor(false);
            }}
          />
          <span>SIN FLOR</span>
        </div>

        <div>
          <input
            type="radio"
            value={conFlor ? "con" : "sin"}
            checked={conFlor}
            name="flor"
            onChange={() => {
              setConFlor(true);
            }}
          />
          <span>CON FLOR</span>
        </div>
      </div>

      <div className={styles.option}>
        <div>
          <input
            type="radio"
            name="buenas"
            checked={conBuenas}
            value={conBuenas ? "con" : "sin"}
            onChange={() => setConBuenas(true)}
          />
          <span>15 Buenas y 15 Malas</span>
        </div>
        <div>
          <input
            type="radio"
            name="buenas"
            checked={!conBuenas}
            value={conBuenas ? "con" : "sin"}
            onChange={() => setConBuenas(false)}
          />
          <span>18 Totales</span>
        </div>
      </div>

      <div className={styles.option}>
        <div>
          <input
            type="radio"
            checked={!isUSDC}
            name="coin"
            value={isUSDC ? "USDC" : "USDT"}
            onChange={() => setIsUSDC(false)}
          />
          <Image width={36} height={36} src="/usdt.png" alt="USDT" />
        </div>
        <div>
          <input
            type="radio"
            checked={isUSDC}
            name="coin"
            value={isUSDC ? "USDC" : "USDT"}
            onChange={() => setIsUSDC(true)}
          />
          <Image width={36} height={36} src="/usdc.png" alt="USDC" />
        </div>
        <input type="number" value={apuesta} onChange={handleApuesta} />
      </div>

      <div className={styles.separator} />

      <button
        onClick={() => {
          create(conFlor, conBuenas, isUSDC, +apuesta);
        }}
      >
        Crear partida
      </button>
      <button onClick={handleClose}>Cancelar</button>
    </div>
  );
};

export default Creating;
