const jwt = require("jsonwebtoken");
require("dotenv").config();

const options = {
  expiresIn: "1h",
};

async function generateJwt(email, userId) {
  try {
    const payload = { email: email, id: userId };
    const token = await jwt.sign(payload, 'askjdaldnaskljdnaklsdjn', options);
    return { error: false, token: token };
  } catch (error) {
    return { error: true };
  }
} 

module.exports = { generateJwt };
