import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/lore.module.scss";

export async function getStaticProps() {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://elden-ring-wiki.vercel.app";
  const res = await fetch(`${apiUrl}/lore`);
  const lore = await res.json();
  return {
    props: { lore },
    revalidate: 3600, //* Re-generate every 1 hour
  };
}

export default function Lore({ lore }) {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.sectionLabel}>Chronicles</span>
          <h1 className={styles.title}>Lore</h1>{" "}
          <p className={styles.subtitle}>
            Uncover the shattered history of the Lands Between
          </p>
        </div>
        {user?.isAdmin && (
          <Link href="/lore/add" className={styles.addBtn}>
            + Add Lore
          </Link>
        )}
      </div>
      <div className={styles.grid}>
        {lore.map((entry) => (
          <Link
            href={`/lore/${entry.slug}`}
            key={entry.slug}
            className={styles.card}
          >
            <div className={styles.cardInner}>
              <span className={styles.category}>{entry.category}</span>
              <span className={styles.cardTitle}>{entry.title}</span>
              <span className={styles.arrow}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
