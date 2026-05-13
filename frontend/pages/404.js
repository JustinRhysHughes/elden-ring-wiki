import Head from "next/head";
import Link from "next/link";
import styles from "../styles/404.module.scss";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Elden Ring Wiki</title>
      </Head>
      <div className={styles.container}>
        <h1>404</h1>
        <h2>You Died</h2>
        <p>The page you are looking for does not exist in the Lands Between.</p>
        <Link href="/" className={styles.button}>
          Return to the Roundtable
        </Link>
      </div>
    </>
  );
}
