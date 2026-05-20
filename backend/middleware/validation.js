const { body, validationResult } = require("express-validator");

// A central error interceptor that handles any validation errors.
// It matches the frontend's expectation of receiving { error: "error message string" }
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

const signupRules = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores."),
  body("rollno")
    .trim()
    .notEmpty()
    .withMessage("Roll number is required.")
    .matches(/^\d{10}$/)
    .withMessage("Roll number must be exactly 10 numeric digits."),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters."),
  body("session")
    .optional({ checkFalsy: true })
    .trim()
    .isIn(["JanJun2026", "JulDec2026"])
    .withMessage("Session must be either JanJun2026 or JulDec2026.")
];

const loginRules = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required."),
  body("rollno")
    .trim()
    .notEmpty()
    .withMessage("Roll number is required.")
    .matches(/^\d{10}$/)
    .withMessage("Roll number must be exactly 10 numeric digits."),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
];

const registerEventRules = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email address."),
  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\d{10,15}$/)
    .withMessage("Phone number must be between 10 and 15 digits."),
  body("clubName")
    .optional({ checkFalsy: true })
    .trim(),
  body("eventName")
    .trim()
    .notEmpty()
    .withMessage("Event name is required.")
];

const contactRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required."),
  body("roll")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\d{10}$/)
    .withMessage("Roll number must be exactly 10 numeric digits."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email address."),
  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required.")
    .isIn([
      "Event Registration Query",
      "Club Collaboration",
      "Technical Issue",
      "Feedback",
      "Other"
    ])
    .withMessage("Please select a valid subject option."),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Message must be between 10 and 1000 characters.")
];

module.exports = {
  handleValidationErrors,
  signupRules,
  loginRules,
  registerEventRules,
  contactRules
};
