import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Elden Ring Wiki</title>
        <meta
          name="description"
          content="An Elden Ring lore and wiki resource"
        />
      </Head>
      <div className={styles.hero}>
        <div className={styles.backgroundWrapper}>
          <Image
            src="/images/background.webp"
            alt="Elden Ring Lands Between"
            fill
            priority
            className={styles.backgroundImage}
          />
          <div className={styles.overlay} />
        </div>
        <div className={styles.content}>
          <h1>Elden Ring Wiki</h1>
          <p>
            Explore the lore, bosses, characters and locations of the Lands
            Between.
          </p>
        </div>
      </div>
    </>
  );
}
