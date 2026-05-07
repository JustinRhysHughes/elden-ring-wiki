import lore from "../../data/lore.json";
import styles from "../../styles/loreDetail.module.scss";

export async function getStaticPaths() {
  const paths = lore.map((entry) => ({
    params: { slug: entry.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const entry = lore.find((l) => l.slug === params.slug);

  return {
    props: { entry },
  };
}

export default function LoreDetail({ entry }) {
  return (
    <div className={styles.container}>
      <h1>{entry.title}</h1>
      <p>
        <strong>Category:</strong> {entry.category}
      </p>
      <p>{entry.description}</p>
    </div>
  );
}
