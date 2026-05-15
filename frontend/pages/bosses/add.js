import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/addBoss.module.scss";

export default function AddBoss() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    difficulty: "Medium",
    drops: "",
    description: "",
    LocationId: "",
  });
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/");
      return;
    }
    // Fetch locations for the dropdown
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations`)
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch(() => setError("Failed to load locations"));
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bosses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          LocationId: parseInt(formData.LocationId),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          Array.isArray(data.error) ? data.error.join(", ") : data.error,
        );
        setLoading(false);
        return;
      }

      router.push("/bosses");
    } catch (err) {
      setError("Unable to connect to server");
      setLoading(false);
    }
  };

  if (!user?.isAdmin) return null;

  return (
    <>
      <Head>
        <title>Add Boss | Elden Ring Wiki</title>
      </Head>
      <div className={styles.container}>
        <h1>Add Boss</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Boss Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Margit, The Fell Omen"
            />
          </div>
          <div className={styles.field}>
            <label>Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Very Hard">Very Hard</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Location</label>
            <select
              name="LocationId"
              value={formData.LocationId}
              onChange={handleChange}
              required
            >
              <option value="">Select a location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>Drops</label>
            <input
              type="text"
              name="drops"
              value={formData.drops}
              onChange={handleChange}
              placeholder="e.g. Talisman Pouch"
            />
          </div>
          <div className={styles.field}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Boss lore and description..."
            />
          </div>
          <div className={styles.buttons}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Boss"}
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => router.push("/bosses")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
