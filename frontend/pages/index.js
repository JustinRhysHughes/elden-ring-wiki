import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Elden Ring Wiki — The Lands Between</title>
        <meta
          name="description"
          content="An Elden Ring lore and wiki resource covering bosses, locations, characters and the lore of the Lands Between."
        />
      </Head>
      <div className={styles.hero}>
        {/* Background image */}
        <div className={styles.backgroundWrapper}>
          <Image
            src="/images/background.webp"
            alt="The Lands Between"
            fill
            priority
            sizes="100vw"
            className={styles.backgroundImage}
          />
          <div className={styles.overlay} />
        </div>

        {/* Hero content */}
        <div className={styles.content}>
          <span className={styles.eyebrow}>A Fan Wiki Resource</span>
          <h1 className={styles.title}>
            Elden
            <br />
            Ring
          </h1>
          <p className={styles.subtitle}>
            Explore the lore, bosses, characters and shattered history of the
            Lands Between.
          </p>
          <div className={styles.cta}>
            <Link href="/bosses" className={styles.ctaPrimary}>
              Explore Bosses
            </Link>
            <Link href="/lore" className={styles.ctaSecondary}>
              Read the Lore
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine} />
          <span className={styles.scrollText}>Scroll</span>
        </div>
      </div>
    </>
  );
}
