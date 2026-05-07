import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Elden Ring Wiki &copy; {new Date().getFullYear()}</p>
      <p>
        <a
          href="https://en.bandainamcoent.eu/elden-ring"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official Elden Ring Site
        </a>
      </p>
    </footer>
  );
}
