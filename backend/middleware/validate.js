// Validation Middleware
// Uses Joi to validate request bodies before they reach the controller
// Returns 400 Bad Request with descriptive error messages if validation fails

const Joi = require("joi");

// Schema for creating/updating a Location
const locationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.min": "Location name must be at least 2 characters",
    "string.max": "Location name must be less than 100 characters",
    "any.required": "Location name is required",
  }),
  region: Joi.string().min(2).max(100).required().messages({
    "string.min": "Region must be at least 2 characters",
    "any.required": "Region is required",
  }),
  description: Joi.string().allow("", null).optional(),
});

// Schema for creating/updating a Boss
const bossSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.min": "Boss name must be at least 2 characters",
    "string.max": "Boss name must be less than 100 characters",
    "any.required": "Boss name is required",
  }),
  difficulty: Joi.string()
    .valid("Easy", "Medium", "Hard", "Very Hard")
    .required()
    .messages({
      "any.only": "Difficulty must be Easy, Medium, Hard or Very Hard",
      "any.required": "Difficulty is required",
    }),
  drops: Joi.string().allow("", null).optional(),
  description: Joi.string().allow("", null).optional(),
  LocationId: Joi.number().integer().required().messages({
    "any.required": "LocationId is required",
    "number.base": "LocationId must be a number",
  }),
});

// Schema for user registration
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must be less than 30 characters",
    "any.required": "Username is required",
  }),
  name: Joi.string().min(2).max(100).required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
  mobile: Joi.string().allow("", null).optional(),
});

// Schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

// Middleware factory function
// Takes a Joi schema and returns a middleware function
// that validates req.body against the schema
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: error.details.map((d) => d.message),
    });
  }

  next();
};

module.exports = {
  validate,
  locationSchema,
  bossSchema,
  registerSchema,
  loginSchema,
};
