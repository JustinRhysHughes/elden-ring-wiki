import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Elden Ring Wiki</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/bosses">Bosses</Link>
        </li>
        <li>
          <Link href="/lore">Lore</Link>
        </li>
        <li>
          <Link href="/characters">Characters</Link>
        </li>
        <li>
          <Link href="/locations">Locations</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
