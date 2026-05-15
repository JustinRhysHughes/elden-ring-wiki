import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/admin.module.scss";

export default function Admin() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/");
      return;
    }
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load users");
      setLoading(false);
    }
  };

  const toggleAdmin = async (userId, currentStatus) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/admin`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isAdmin: !currentStatus }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update user");
        return;
      }

      setSuccess(`User ${data.user.username} updated successfully`);
      fetchUsers();
    } catch (err) {
      setError("Unable to connect to server");
    }
  };

  if (!user?.isAdmin) return null;

  return (
    <>
      <Head>
        <title>Admin Panel | Elden Ring Wiki</title>
      </Head>
      <div className={styles.container}>
        <h1>Admin Panel</h1>
        <p className={styles.subtitle}>Manage user accounts and permissions</p>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        {loading ? (
          <p className={styles.loading}>Loading users...</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Admin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className={u.isAdmin ? styles.adminRow : ""}>
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.mobile || "—"}</td>
                    <td>
                      <span
                        className={
                          u.isAdmin ? styles.adminBadge : styles.userBadge
                        }
                      >
                        {u.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td>
                      {u.id !== user.id && (
                        <button
                          onClick={() => toggleAdmin(u.id, u.isAdmin)}
                          className={
                            u.isAdmin ? styles.demoteBtn : styles.promoteBtn
                          }
                        >
                          {u.isAdmin ? "Remove Admin" : "Make Admin"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
