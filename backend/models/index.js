// Models Index File
// Initialises all models, defines associations between them
// and exports the sequelize instance and all models from a single file

const sequelize = require("../config/database");
const Boss = require("./Boss");
const Location = require("./Location");
const User = require("./User");
const Lore = require("./Lore");

// Associations
// A Location can have many Bosses
// A Boss belongs to one Location
Location.hasMany(Boss, {
  foreignKey: "LocationId",
  onDelete: "CASCADE",
});

Boss.belongsTo(Location, {
  foreignKey: "LocationId",
});

module.exports = {
  sequelize,
  Boss,
  Location,
  User,
  Lore,
};
