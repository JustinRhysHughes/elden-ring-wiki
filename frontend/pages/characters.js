import Head from "next/head";
import styles from "../styles/characters.module.scss";

const characters = [
  {
    name: "Melina",
    role: "Maiden",
    description:
      "A maiden who offers to serve as your guide and accompanies you on your journey. She grants the ability to level up at Sites of Grace and seeks to reach the Erdtree.",
  },
  {
    name: "Ranni the Witch",
    role: "Demigod",
    description:
      "A demigod witch and daughter of Radagon and Rennala. She abandoned her own fate and seeks to forge a new order beyond the Golden Order.",
  },
  {
    name: "Varré",
    role: "NPC",
    description:
      "The first NPC encountered in the Lands Between. A white-masked figure who greets Tarnished at the start of their journey with a condescending tone.",
  },
  {
    name: "Fia, Deathbed Companion",
    role: "NPC",
    description:
      "A woman who holds Tarnished in her embrace to grant them a blessing. She seeks to restore the Rune of Death and champion the cause of those who die.",
  },
  {
    name: "Godrick the Grafted",
    role: "Demigod",
    description:
      "A demigod and descendant of Godfrey. Obsessed with power, he grafts the limbs of fallen warriors onto his own body to compensate for his weakness.",
  },
  {
    name: "Maliketh, the Black Blade",
    role: "Demigod",
    description:
      "The shadow and half-brother of Queen Marika. He serves as the guardian of the Rune of Death, sealed within the sacred blade Destined Death.",
  },
];

export default function Characters() {
  return (
    <>
      <Head>
        <title>Characters | Elden Ring Wiki</title>
        <meta
          name="description"
          content="Notable characters of the Lands Between"
        />
      </Head>
      <div className={styles.container}>
        <h1>Characters</h1>
        <p>
          Notable figures of the Lands Between — allies, enemies and everything
          in between.
        </p>
        <div className={styles.grid}>
          {characters.map((char) => (
            <div key={char.name} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>{char.name}</h2>
                <span className={styles.role}>{char.role}</span>
              </div>
              <p>{char.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
