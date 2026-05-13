import Image from "next/image";
import Link from "next/link";
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
  return { props: { entry } };
}

export default function LoreDetail({ entry }) {
  return (
    <div className={styles.container}>
      <Link href="/lore" className={styles.back}>
        ← Back to Lore
      </Link>
      {entry.image && (
        <div className={styles.imageWrapper}>
          <Image
            src={entry.image}
            alt={`${entry.title} lore image`}
            width={800}
            height={450}
            className={styles.image}
            priority
          />
        </div>
      )}
      <div className={styles.content}>
        <h1>{entry.title}</h1>
        <span className={styles.category}>{entry.category}</span>
        <p>{entry.description}</p>
      </div>
    </div>
  );
}
