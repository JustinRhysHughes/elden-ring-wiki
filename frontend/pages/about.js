import Head from "next/head";
import Link from "next/link";
import styles from "../styles/about.module.scss";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Elden Ring Wiki</title>
        <meta
          name="description"
          content="About this Elden Ring lore and wiki resource"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.sectionLabel}>The Wiki</span>
            <h1 className={styles.title}>About</h1>
            <p className={styles.subtitle}>
              A fan-built resource for the world of Elden Ring
            </p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <span className={styles.sectionNumber}>01</span>
            <div className={styles.sectionBody}>
              <h2>What is Elden Ring?</h2>
              <p>
                Elden Ring is an action role-playing game set in the Lands
                Between, a vast and ancient realm governed by the power of the
                Elden Ring and the Erdtree. Developed by FromSoftware in
                collaboration with fantasy novelist George R. R. Martin, who
                contributed to the world&apos;s mythology and backstory.
              </p>
              <p>
                Players take on the role of a Tarnished — an exiled warrior
                stripped of the grace of the Erdtree — who returns to the Lands
                Between to seek the shards of the shattered Elden Ring and
                ultimately become the Elden Lord.
              </p>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <span className={styles.sectionNumber}>02</span>
            <div className={styles.sectionBody}>
              <h2>About This Resource</h2>
              <p>
                This wiki was built as a full-stack web development project to
                document and explore the rich lore, characters, locations and
                bosses of the Lands Between. Built with Next.js, Express,
                PostgreSQL and deployed via Vercel and Supabase.
              </p>
              <p>
                All lore content is based on in-game item descriptions, NPC
                dialogue, and environmental storytelling found throughout Elden
                Ring.
              </p>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <span className={styles.sectionNumber}>03</span>
            <div className={styles.sectionBody}>
              <h2>External Resources</h2>
              <p>For official information and community resources:</p>
              <div className={styles.links}>
                <a
                  href="https://en.bandainamcoent.eu/elden-ring/elden-ring"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalLink}
                >
                  Official Elden Ring Site
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
