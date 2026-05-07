import Head from "next/head";
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
        <h1>Welcome to the Elden Ring Wiki</h1>
        <p>
          Explore the lore, bosses, characters and locations of the Lands
          Between.
        </p>
      </div>
    </>
  );
}
