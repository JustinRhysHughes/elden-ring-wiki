import Link from "next/link";
import Head from "next/head";
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
    <>
      <Head>
        <title>Bosses | Elden Ring Wiki</title>
        <meta
          name="description"
          content="Browse all bosses in Elden Ring, including locations, difficulty and rewards."
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.sectionLabel}>Field Guide</span>
            <h1 className={styles.title}>Bosses</h1>{" "}
            <p className={styles.subtitle}>
              The most fearsome enemies of the Lands Between
            </p>
          </div>
          {user?.isAdmin && (
            <Link href="/bosses/add" className={styles.addBtn}>
              + Add Boss
            </Link>
          )}
        </div>
        <div className={styles.grid}>
          {bosses.map((boss) => (
            <Link
              href={`/bosses/${boss.slug}`}
              key={boss.slug}
              className={styles.card}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardMeta}>
                  <span
                    className={styles.difficulty}
                    data-difficulty={boss.difficulty}
                  >
                    {boss.difficulty}
                  </span>
                </div>
                <span className={styles.cardName}>{boss.name}</span>
                <span className={styles.cardLocation}>{boss.location}</span>
                <span className={styles.arrow}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
