import Head from "next/head";
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
        <div className={styles.hero}>
          <h1>About This Wiki</h1>
          <p>
            A comprehensive lore and reference resource for Elden Ring — the
            action RPG developed by FromSoftware and published by Bandai Namco
            Entertainment.
          </p>
        </div>
        <div className={styles.content}>
          <section className={styles.section}>
            <h2>What is Elden Ring?</h2>
            <p>
              Elden Ring is an action role-playing game set in the Lands
              Between, a vast and ancient realm governed by the power of the
              Elden Ring and the Erdtree. The game was developed by FromSoftware
              in collaboration with fantasy novelist George R. R. Martin, who
              contributed to the world's mythology and backstory.
            </p>
            <p>
              Players take on the role of a Tarnished — an exiled warrior
              stripped of the grace of the Erdtree — who returns to the Lands
              Between to seek the shards of the shattered Elden Ring and
              ultimately become the Elden Lord.
            </p>
          </section>
          <section className={styles.section}>
            <h2>About This Resource</h2>
            <p>
              This wiki was built as a personal project to document and explore
              the rich lore, characters, locations and bosses of the Lands
              Between. It is built with Next.js and served as both a lore
              reference and a full-stack web development project.
            </p>
            <p>
              All lore content is based on in-game item descriptions, NPC
              dialogue, and environmental storytelling found throughout Elden
              Ring.
            </p>
          </section>
          <section className={styles.section}>
            <h2>External Resources</h2>
            <p>
              For official information, visit the{" "}
              <a
                href="https://en.bandainamcoent.eu/elden-ring/elden-ring"
                target="_blank"
                rel="noopener noreferrer"
              >
                official Elden Ring website
              </a>{" "}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
