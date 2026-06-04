import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/bossDetail.module.scss";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://elden-ring-wiki-api.vercel.app";

  try {
    const res = await fetch(`${apiUrl}/api/bosses/${params.slug}`);

    if (!res.ok) return { notFound: true };

    const entry = await res.json();

    if (!entry || !entry.id) return { notFound: true };

    return {
      props: { entry },
      revalidate: 3600,
    };
  } catch (err) {
    return { notFound: true };
  }
}

export default function BossDetail({ entry }) {
  const { user, token } = useAuth();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${entry.name}?`)) return;

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://elden-ring-wiki-api.vercel.app";

      const res = await fetch(`${apiUrl}/api/bosses/${entry.id}`, {
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

      <div className={styles.layout}>
        {entry.image && (
          <div className={styles.imageWrapper}>
            <Image
              src={entry.image}
              alt={`${entry.name} boss from Elden Ring`}
              width={800}
              height={500}
              className={styles.image}
              priority
            />
          </div>
        )}

        <div className={styles.content}>
          <span className={styles.eyebrow}>Boss</span>
          <h1 className={styles.title}>{entry.name}</h1>

          <div className={styles.meta}>
            <div className={styles.metaRow}>
              <strong>Location</strong>
              <span>{entry.location}</span>
            </div>

            <div className={styles.metaRow}>
              <strong>Difficulty</strong>
              <span
                className={styles.difficulty}
                data-difficulty={entry.difficulty}
              >
                {entry.difficulty}
              </span>
            </div>

            <div className={styles.metaRow}>
              <strong>Drops</strong>
              <span>{entry.drops}</span>
            </div>
          </div>

          <p className={styles.description}>{entry.description}</p>
        </div>
      </div>
    </div>
  );
}
