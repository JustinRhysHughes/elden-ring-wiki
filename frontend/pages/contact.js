import Head from "next/head";
import styles from "../styles/contact.module.scss";
import { useState } from "react";

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
    // Form submission logic will connect to backend API later
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
        <h1>Contact</h1>
        <p>Have a suggestion, correction or question? Get in touch.</p>
        {submitted ? (
          <div className={styles.success}>
            <h2>Message Sent</h2>
            <p>Thank you for your message. We will get back to you soon.</p>
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
                rows={6}
              />
            </div>
            <button type="submit" className={styles.button}>
              Send Message
            </button>
          </form>
        )}
      </div>
    </>
  );
}
