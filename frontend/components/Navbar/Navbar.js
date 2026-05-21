import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/bosses", label: "Bosses" },
    { href: "/lore", label: "Lore" },
    { href: "/characters", label: "Characters" },
    { href: "/locations", label: "Locations" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link href="/">Elden Ring Wiki</Link>
      </div>

      {/* Desktop nav links */}
      <ul className={styles.navLinks}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>

      {/* Auth section */}
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

        {/* Hamburger button */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {user ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {user.isAdmin && (
                <Link
                  href="/admin"
                  className={styles.adminBtn}
                  onClick={closeMenu}
                >
                  Admin Panel
                </Link>
              )}
              <Link
                href="/account"
                className={styles.username}
                onClick={closeMenu}
              >
                👤 {user.username}
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <div className={styles.mobileAuth}>
              {" "}
              <Link
                href="/login"
                className={styles.loginBtn}
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={styles.registerBtn}
                onClick={closeMenu}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
