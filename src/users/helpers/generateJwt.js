const jwt = require("jsonwebtoken");
require("dotenv").config();

const options = {
  expiresIn: "1h",
};

async function generateJwt(email, userId, name, surname) {
  try {
    const payload = { email: email, id: userId, name: name, surname: surname };
    const token = await jwt.sign(payload, 'askjdaldnaskljdnaklsdjn', options);
    return { error: false, token: token };
  } catch (error) {
    return { error: true };
  }
} 

module.exports = { generateJwt };
