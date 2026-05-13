import Image from "next/image";
import Link from "next/link";
import bosses from "../../data/bosses.json";
import styles from "../../styles/bossDetail.module.scss";

export async function getStaticPaths() {
  const paths = bosses.map((boss) => ({
    params: { slug: boss.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const boss = bosses.find((b) => b.slug === params.slug);
  return { props: { boss } };
}

export default function BossDetail({ boss }) {
  return (
    <div className={styles.container}>
      <Link href="/bosses" className={styles.back}>
        ← Back to Bosses
      </Link>
      {boss.image && (
        <div className={styles.imageWrapper}>
          <Image
            src={boss.image}
            alt={`${boss.name} boss image`}
            width={800}
            height={450}
            className={styles.image}
            priority
          />
        </div>
      )}
      <div className={styles.content}>
        <h1>{boss.name}</h1>
        <div className={styles.meta}>
          <span>
            <strong>Location:</strong> {boss.location}
          </span>
          <span>
            <strong>Difficulty:</strong> {boss.difficulty}
          </span>
          <span>
            <strong>Drops:</strong> {boss.drops}
          </span>
        </div>
        <p>{boss.description}</p>
      </div>
    </div>
  );
}
