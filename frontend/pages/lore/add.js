import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/addLore.module.scss";

export default function AddLore() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          Array.isArray(data.error) ? data.error.join(", ") : data.error,
        );
        setLoading(false);
        return;
      }

      router.push("/lore");
    } catch (err) {
      setError("Unable to connect to server");
      setLoading(false);
    }
  };

  if (!user?.isAdmin) return null;

  return (
    <>
      <Head>
        <title>Add Lore | Elden Ring Wiki</title>
      </Head>
      <div className={styles.container}>
        <h1>Add Lore Entry</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. The Erdtree"
            />
          </div>
          <div className={styles.field}>
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="e.g. Location, Faction, Event"
            />
          </div>
          <div className={styles.field}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              required
              placeholder="Lore description..."
            />
          </div>
          <div className={styles.field}>
            <label>
              Image URL <span className={styles.optional}>(optional)</span>
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="e.g. /images/bosses/boss-name.webp"
            />
          </div>
          <div className={styles.buttons}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Entry"}
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => router.push("/lore")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
