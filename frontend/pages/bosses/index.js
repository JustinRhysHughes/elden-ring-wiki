import Link from "next/link";
import bosses from "../../data/bosses.json";
import styles from "../../styles/bosses.module.scss";

export default function Bosses() {
  return (
    <div className={styles.container}>
      <h1>Bosses</h1>
      <p>The most fearsome enemies of the Lands Between.</p>
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
