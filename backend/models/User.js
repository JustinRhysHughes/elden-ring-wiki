// User Model
// Represents a registered user of the Elden Ring API
// Passwords are hashed using bcrypt before storage
// isAdmin flag controls access to protected endpoints

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    // Primary key
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // Unique username for the user
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Username already taken",
      },
      validate: {
        notEmpty: {
          msg: "Username cannot be empty",
        },
        len: {
          args: [3, 30],
          msg: "Username must be between 3 and 30 characters",
        },
      },
    },
    // Full name of the user
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty",
        },
      },
    },
    // Unique email address
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email already registered",
      },
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
        notEmpty: {
          msg: "Email cannot be empty",
        },
      },
    },
    // Hashed password - never stored as plain text
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password cannot be empty",
        },
        len: {
          args: [6, 100],
          msg: "Password must be at least 6 characters",
        },
      },
    },
    // Optional mobile number
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^[0-9+\s()-]*$/,
          msg: "Mobile must be a valid phone number",
        },
      },
    },
    // Admin flag - controls access to protected routes
    // Defaults to false for all new users
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    // Hash password before creating a new user
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      // Hash password before updating if it has been changed
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  },
);

module.exports = User;
