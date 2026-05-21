import Head from "next/head";
import styles from "../styles/locations.module.scss";

const locations = [
  {
    name: "Limgrave",
    type: "Region",
    description:
      "The starting region of the Lands Between. A vast open grassland filled with ruins, caves and the remnants of a once-great civilisation.",
  },
  {
    name: "Stormveil Castle",
    type: "Legacy Dungeon",
    description:
      "A massive fortified castle perched on a cliff overlooking Limgrave. Home to Godrick the Grafted and his army of grafted warriors.",
  },
  {
    name: "Liurnia of the Lakes",
    type: "Region",
    description:
      "A flooded region north of Limgrave dominated by the Raya Lucaria Academy. Home to sorcerers and scholars of the Carian royal family.",
  },
  {
    name: "Raya Lucaria Academy",
    type: "Legacy Dungeon",
    description:
      "A grand academy of sorcery floating above the lakes of Liurnia. Ruled by Rennala, Queen of the Full Moon.",
  },
  {
    name: "Caelid",
    type: "Region",
    description:
      "A scarlet rot-ravaged wasteland east of Limgrave. The result of a battle between Malenia and Radahn that unleashed the deadly rot.",
  },
  {
    name: "Leyndell, Royal Capital",
    type: "Legacy Dungeon",
    description:
      "The grand capital city of the Lands Between, built around the base of the Erdtree. Seat of the Golden Order and the Erdtree Sanctuary.",
  },
];

export default function Locations() {
  return (
    <>
      <Head>
        <title>Locations | Elden Ring Wiki</title>
        <meta
          name="description"
          content="Explore the regions and dungeons of the Lands Between"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.sectionLabel}>Atlas</span>
            <h1 className={styles.title}>Locations</h1>
            <p className={styles.subtitle}>
              Regions, legacy dungeons and points of interest across the Lands
              Between
            </p>
          </div>
        </div>
        <div className={styles.grid}>
          {locations.map((loc) => (
            <div key={loc.name} className={styles.card}>
              <div className={styles.cardInner}>
                <div className={styles.cardMeta}>
                  <span className={styles.type}>{loc.type}</span>
                </div>
                <h2 className={styles.cardName}>{loc.name}</h2>
                <p className={styles.cardDescription}>{loc.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
