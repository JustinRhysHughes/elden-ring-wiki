import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/account.module.scss";

export default function Account() {
  const { user, token, login } = useAuth();
  const router = useRouter();

  const [details, setDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [detailsMsg, setDetailsMsg] = useState(null);
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [detailsError, setDetailsError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    setDetails({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
    });
  }, [user]);

  const handleDetailsChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
    setDetailsError(null);
    setDetailsMsg(null);
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setPasswordError(null);
    setPasswordMsg(null);
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setDetailsError(null);
    setDetailsMsg(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(details),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setDetailsError(data.error || "Failed to update details");
        return;
      }

      login({ ...user, ...details }, token);
      setDetailsMsg("Details updated successfully");
    } catch (err) {
      setDetailsError("Unable to connect to server");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordMsg(null);

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.error || "Failed to update password");
        return;
      }

      setPasswordMsg("Password updated successfully");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setPasswordError("Unable to connect to server");
    }
  };

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Account | Elden Ring Wiki</title>
      </Head>
      <div className={styles.container}>
        <h1>Account Settings</h1>
        <p className={styles.subtitle}>Manage your profile, {user.username}</p>

        <div className={styles.grid}>
          {/* Update Details */}
          <div className={styles.card}>
            <h2>Update Details</h2>
            {detailsError && <div className={styles.error}>{detailsError}</div>}
            {detailsMsg && <div className={styles.success}>{detailsMsg}</div>}
            <form className={styles.form} onSubmit={handleDetailsSubmit}>
              <div className={styles.field}>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={details.name}
                  onChange={handleDetailsChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={details.email}
                  onChange={handleDetailsChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  value={details.mobile}
                  onChange={handleDetailsChange}
                  placeholder="0412 345 678"
                />
              </div>
              <button type="submit" className={styles.button}>
                Save Changes
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className={styles.card}>
            <h2>Change Password</h2>
            {passwordError && (
              <div className={styles.error}>{passwordError}</div>
            )}
            {passwordMsg && <div className={styles.success}>{passwordMsg}</div>}
            <form className={styles.form} onSubmit={handlePasswordSubmit}>
              <div className={styles.field}>
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="••••••••"
                />
              </div>
              <div className={styles.field}>
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="••••••••"
                />
              </div>
              <div className={styles.field}>
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className={styles.button}>
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
