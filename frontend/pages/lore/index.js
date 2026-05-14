import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import lore from "../../data/lore.json";
import styles from "../../styles/lore.module.scss";

export default function Lore() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Lore</h1>
          <p>Uncover the secrets of the Lands Between.</p>
        </div>
        {user?.isAdmin && (
          <Link href="/lore/add" className={styles.addBtn}>
            + Add Lore
          </Link>
        )}
      </div>
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
