const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
  const payload = {
    user: {
      id: userId,
      role: role,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = generateToken;
