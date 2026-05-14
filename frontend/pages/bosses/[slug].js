import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
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
  const { user, token } = useAuth();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${boss.name}?`)) return;

    try {
      const res = await fetch(`http://localhost:4000/api/bosses/${boss.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        router.push("/bosses");
      } else {
        alert("Failed to delete boss");
      }
    } catch (err) {
      alert("Unable to connect to server");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/bosses" className={styles.back}>
          ← Back to Bosses
        </Link>
        {user?.isAdmin && (
          <button onClick={handleDelete} className={styles.deleteBtn}>
            Delete Boss
          </button>
        )}
      </div>
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
