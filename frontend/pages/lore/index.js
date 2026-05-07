import Link from "next/link";
import lore from "../../data/lore.json";
import styles from "../../styles/lore.module.scss";

export default function Lore() {
  return (
    <div className={styles.container}>
      <h1>Lore</h1>
      <p>Uncover the secrets of the Lands Between.</p>
      <div className={styles.grid}>
        {lore.map((entry) => (
          <Link href={`/lore/${entry.slug}`} key={entry.slug}>
            <div className={styles.card}>
              <h2>{entry.title}</h2>
              <span>{entry.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
