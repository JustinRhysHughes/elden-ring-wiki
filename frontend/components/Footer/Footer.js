import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span className={styles.brand}>Elden Ring Wiki</span>
        <span className={styles.copy}>
          &copy; {new Date().getFullYear()} — Fan resource, not affiliated with
          FromSoftware
        </span>
      </div>

      <div className={styles.right}>
        <a
          href="https://en.bandainamcoent.eu/elden-ring/elden-ring"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.externalLink}
        >
          Official Elden Ring Site
        </a>

        <span className={styles.disclaimer}>
          All game content belongs to FromSoftware &amp; Bandai Namco
        </span>
      </div>
    </footer>
  );
}
