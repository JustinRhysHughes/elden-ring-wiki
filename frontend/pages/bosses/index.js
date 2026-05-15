import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/bosses.module.scss";

export async function getServerSideProps() {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://elden-ring-wiki.vercel.app";
  const res = await fetch(`${apiUrl}/api/bosses`);
  const bosses = await res.json();
  return { props: { bosses } };
}

export default function Bosses({ bosses }) {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Bosses</h1>
          <p>The most fearsome enemies of the Lands Between.</p>
        </div>
        {user?.isAdmin && (
          <Link href="/bosses/add" className={styles.addBtn}>
            + Add Boss
          </Link>
        )}
      </div>
      <div className={styles.grid}>
        {bosses.map((boss) => (
          <Link href={`/bosses/${boss.slug}`} key={boss.slug}>
            <div className={styles.card}>
              <h2>{boss.name}</h2>
              <p>{boss.location}</p>
              <span>{boss.difficulty}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
