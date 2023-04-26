const crypto = require("crypto");

// Hashing algorithm
const iterations = 1000;
const salt = crypto.randomBytes(256).toString("hex");
const hashSize = 64;
const hashAlgo = "sha256";

function HashPassword(password, salt) {
  const pepper = process.env.PEPPER;

  return (hash = crypto
    .pbkdf2Sync(password, salt + pepper, iterations, hashSize, hashAlgo)
    .toString("hex"));
}

module.exports = { HashPassword, salt };