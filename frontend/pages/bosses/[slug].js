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

  return {
    props: { boss },
  };
}

export default function BossDetail({ boss }) {
  return (
    <div className={styles.container}>
      <h1>{boss.name}</h1>
      <p>
        <strong>Location:</strong> {boss.location}
      </p>
      <p>
        <strong>Difficulty:</strong> {boss.difficulty}
      </p>
      <p>
        <strong>Drops:</strong> {boss.drops}
      </p>
      <p>{boss.description}</p>
    </div>
  );
}
