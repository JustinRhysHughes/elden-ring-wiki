import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Elden Ring Wiki</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/bosses">Bosses</Link>
        </li>
        <li>
          <Link href="/lore">Lore</Link>
        </li>
        <li>
          <Link href="/characters">Characters</Link>
        </li>
        <li>
          <Link href="/locations">Locations</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      <div className={styles.auth}>
        {user ? (
          <>
            {user.isAdmin && (
              <Link href="/admin" className={styles.adminBtn}>
                Admin
              </Link>
            )}
            <Link href="/account" className={styles.username}>
              👤 {user.username}
            </Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.loginBtn}>
              Login
            </Link>
            <Link href="/register" className={styles.registerBtn}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
