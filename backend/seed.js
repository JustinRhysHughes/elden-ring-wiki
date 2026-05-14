// Seed File
// Populates the database with initial boss, location and lore data
// Run with: node seed.js

require("dotenv").config();
const { sequelize, Boss, Location, Lore } = require("./models");

const locations = [
  {
    name: "Stormhill",
    region: "Limgrave",
    description: "A hill leading to Stormveil Castle, guarded by Margit.",
  },
  {
    name: "Stormveil Castle",
    region: "Limgrave",
    description:
      "A massive fortified castle perched on a cliff overlooking Limgrave. Home to Godrick the Grafted.",
  },
  {
    name: "Raya Lucaria Academy",
    region: "Liurnia of the Lakes",
    description:
      "A grand academy of sorcery floating above the lakes of Liurnia. Ruled by Rennala, Queen of the Full Moon.",
  },
  {
    name: "Elphael, Brace of the Haligtree",
    region: "Miquella's Haligtree",
    description: "The base of Miquella's Haligtree, where Malenia resides.",
  },
  {
    name: "Crumbling Farum Azula",
    region: "Farum Azula",
    description: "A crumbling city suspended in a storm, home to Maliketh.",
  },
  {
    name: "Leyndell, Royal Capital",
    region: "Altus Plateau",
    description:
      "The grand capital city of the Lands Between, built around the base of the Erdtree.",
  },
  {
    name: "Mohgwyn Palace",
    region: "Siofra River",
    description:
      "A blood-soaked palace hidden deep underground, ruled by Mohg.",
  },
];

const bosses = [
  {
    slug: "margit-the-fell-omen",
    name: "Margit, The Fell Omen",
    location: "Stormhill",
    locationIndex: 0,
    description:
      "A powerful demigod who guards the entrance to Stormveil Castle. Margit is one of the first major challenges faced by Tarnished seeking to claim the Elden Ring.",
    difficulty: "Hard",
    drops: "Talisman Pouch",
    image: "/images/bosses/margit.webp",
  },
  {
    slug: "godrick-the-grafted",
    name: "Godrick the Grafted",
    location: "Stormveil Castle",
    locationIndex: 1,
    description:
      "A demigod and descendant of Godfrey, the first Elden Lord. Godrick grafts the limbs of fallen warriors onto his body to gain their strength.",
    difficulty: "Hard",
    drops: "Shardbearing Soul, Godrick's Great Rune",
    image: "/images/bosses/godrick.webp",
  },
  {
    slug: "rennala-queen-of-the-full-moon",
    name: "Rennala, Queen of the Full Moon",
    location: "Raya Lucaria Academy",
    locationIndex: 2,
    description:
      "Once the head of the Carian royal family and a master sorceress, Rennala was shattered by the loss of her Erdleaf when her husband Radagon left her.",
    difficulty: "Medium",
    drops: "Remembrance of the Full Moon Queen, Great Rune of the Unborn",
    image: "/images/bosses/rennala.webp",
  },
  {
    slug: "malenia-blade-of-miquella",
    name: "Malenia, Blade of Miquella",
    location: "Elphael, Brace of the Haligtree",
    locationIndex: 3,
    description:
      "Malenia is the twin of Miquella and is widely considered the most fearsome warrior in the Lands Between. She carries the Scarlet Rot within her body and has never once known defeat.",
    difficulty: "Very Hard",
    drops: "Remembrance of the Rot Goddess, Malenia's Great Rune",
    image: "/images/bosses/malenia.webp",
  },
  {
    slug: "maliketh-the-black-blade",
    name: "Maliketh, the Black Blade",
    location: "Crumbling Farum Azula",
    locationIndex: 4,
    description:
      "The shadow and half-brother of Queen Marika. Maliketh is the guardian of the Rune of Death, sealed within the cursed blade Destined Death.",
    difficulty: "Very Hard",
    drops: "Remembrance of the Black Blade",
    image: "/images/bosses/maliketh.webp",
  },
  {
    slug: "godfrey-hoarah-loux",
    name: "Godfrey, First Elden Lord / Hoarah Loux",
    location: "Leyndell, Royal Capital",
    locationIndex: 5,
    description:
      "Godfrey was the first Elden Lord and consort of Queen Marika. After being stripped of his grace he became Hoarah Loux, a fierce chieftain who returns to the Lands Between to reclaim his throne.",
    difficulty: "Very Hard",
    drops: "Remembrance of Hoarah Loux",
    image: "/images/bosses/godfrey.webp",
  },
  {
    slug: "mohg-lord-of-blood",
    name: "Mohg, Lord of Blood",
    location: "Mohgwyn Palace",
    locationIndex: 6,
    description:
      "Mohg is a demigod and twin of Morgott. He is the lord of the Mohgwyn Dynasty and seeks to elevate Miquella to godhood using the power of the Formless Mother.",
    difficulty: "Very Hard",
    drops: "Remembrance of the Blood Lord, Mohg's Great Rune",
    image: "/images/bosses/mohg.webp",
  },
];

const lore = [
  {
    slug: "the-lands-between",
    title: "The Lands Between",
    category: "Location",
    description:
      "The Lands Between is the world of Elden Ring, and those who live in The Lands Between were blessed by Grace through the Elden Ring and the Erdtree. Those who were blessed by the Elden Ring are characterized by having a golden aura that can be seen in their eyes. However, at some point, some of those who were blessed lost their grace; they were exiled and labeled the Tarnished. As time passed, for unknown reasons, the Elden Ring was shattered and its shards were scattered across the Lands Between. The largest of these pieces were called Great Runes and were claimed by the six Demigod children of Queen Marika the Eternal, causing them to inherit different powers and have been physically changed and twisted due to being corrupted by the power of these runes.",
    image: "/images/lore/lands-between.webp",
  },
  {
    slug: "the-golden-order",
    title: "The Golden Order",
    category: "Faction",
    description:
      "The Golden Order is the ruling theological and political system of the Lands Between, founded upon the power of the Elden Ring and the Erdtree. It was established by Godfrey, the first Elden Lord, and upheld by Queen Marika the Eternal. The Golden Order dictates that all things must live and die in accordance with the will of the Erdtree, and that the Rune of Death must remain sealed.",
    image: "/images/lore/golden-order.webp",
  },
  {
    slug: "the-erdtree",
    title: "The Erdtree",
    category: "Location",
    description:
      "The Erdtree is a colossal golden tree that dominates the Lands Between. It is the source of Grace and the symbol of the Golden Order's power. The Erdtree is sustained by the Elden Ring and serves as the afterlife for those who die within the Lands Between — their bodies dissolve into light and return to the tree's roots.",
    image: "/images/lore/erdtree.webp",
  },
  {
    slug: "the-tarnished",
    title: "The Tarnished",
    category: "Lore",
    description:
      "The Tarnished are warriors who were once blessed by the Erdtree's grace but had it stripped from them and were exiled from the Lands Between. After the Elden Ring was shattered, grace was extended to the Tarnished once more, beckoning them to return and seek the Great Runes. The player character is one such Tarnished.",
    image: "/images/lore/lands-between.webp",
  },
  {
    slug: "the-shattering",
    title: "The Shattering",
    category: "Event",
    description:
      "The Shattering was a catastrophic war that followed the death of Godwyn the Golden and the breaking of the Elden Ring. Queen Marika shattered the Elden Ring in grief, and its fragments — the Great Runes — were claimed by her demigod children. The demigods then waged war against each other in a devastating conflict that reshaped the Lands Between.",
    image: "/images/lore/lands-between.webp",
  },
  {
    slug: "grace-and-the-erdtree",
    title: "Grace and the Erdtree",
    category: "Lore",
    description:
      "Grace is a divine blessing bestowed by the Erdtree upon those deemed worthy. It manifests as a golden aura visible in the eyes of the blessed. Grace guides the Tarnished along their path through the Lands Between, appearing as golden wisps pointing toward Sites of Grace — sacred resting places that restore health and allow levelling up.",
    image: "/images/lore/erdtree.webp",
  },
];

async function seed() {
  try {
    // Force sync to recreate tables with new schema
    await sequelize.sync({ force: true });
    console.log("Database synced");

    // Create locations first
    const createdLocations = await Location.bulkCreate(locations);
    console.log(`Created ${createdLocations.length} locations`);

    // Create bosses linked to locations
    for (const boss of bosses) {
      await Boss.create({
        slug: boss.slug,
        name: boss.name,
        location: boss.location,
        difficulty: boss.difficulty,
        drops: boss.drops,
        description: boss.description,
        image: boss.image,
        LocationId: createdLocations[boss.locationIndex].id,
      });
    }
    console.log(`Created ${bosses.length} bosses`);

    // Create lore entries
    await Lore.bulkCreate(lore);
    console.log(`Created ${lore.length} lore entries`);

    console.log("Seed complete");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();
