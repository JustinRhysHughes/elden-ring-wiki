import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/contact.module.scss";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Contact | Elden Ring Wiki</title>
        <meta
          name="description"
          content="Get in touch with the Elden Ring Wiki"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <span className={styles.eyebrow}>Get in Touch</span>
          <h1 className={styles.title}>Contact</h1>
          <p className={styles.subtitle}>
            Have a suggestion, correction or question? Send a message.
          </p>

          {submitted ? (
            <div className={styles.success}>
              <h2>Message Received</h2>
              <p>
                Thank you for reaching out. We will get back to you soon,
                Tarnished.
              </p>
              <Link href="/" className={styles.backLink}>
                Return Home
              </Link>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message..."
                  rows={5}
                />
              </div>
              <button type="submit" className={styles.button}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
