import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/loreDetail.module.scss";

//* Tell Next.js which lore slugs exist
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

//* Generate the static page for each slug
export async function getStaticProps({ params }) {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://elden-ring-wiki.vercel.app";

  try {
    const res = await fetch(`${apiUrl}/lores/${params.slug}`);

    if (!res.ok) {
      return { notFound: true };
    }

    const entry = await res.json();

    if (!entry || !entry.id) {
      return { notFound: true };
    }

    return {
      props: { entry },
      revalidate: 3600, //* Re-generate every 1 hour
    };
  } catch (err) {
    return { notFound: true };
  }
}

export default function LoreDetail({ entry }) {
  const { user, token } = useAuth();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${entry.title}?`)) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lore/${entry.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.ok) {
        router.push("/lore");
      } else {
        alert("Failed to delete lore entry");
      }
    } catch (err) {
      alert("Unable to connect to server");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/lore" className={styles.back}>
          ← Back to Lore
        </Link>
        {user?.isAdmin && (
          <button onClick={handleDelete} className={styles.deleteBtn}>
            Delete Entry
          </button>
        )}
      </div>

      <div className={styles.layout}>
        {/* Left — image */}
        {entry.image && (
          <div className={styles.imageWrapper}>
            <Image
              src={entry.image}
              alt={entry.title}
              width={800}
              height={500}
              className={styles.image}
              priority
            />
          </div>
        )}

        {/* Right — content */}
        <div className={styles.content}>
          <span className={styles.eyebrow}>Lore</span>
          <h1 className={styles.title}>{entry.title}</h1>
          <span className={styles.category}>{entry.category}</span>
          <p className={styles.description}>{entry.description}</p>
        </div>
      </div>
    </div>
  );
}
