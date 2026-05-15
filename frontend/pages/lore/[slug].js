import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/loreDetail.module.scss";

export async function getServerSideProps({ params }) {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://elden-ring-wiki.vercel.app";
  const res = await fetch(`${apiUrl}/api/lore/${params.slug}`);
  const entry = await res.json();
  return { props: { entry } };
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
