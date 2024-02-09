// The script generates a cryptographically strong random key. (SecureRandom, RandomNumberGenerator, etc. - mandatory) with a length of at least 256 bits, makes own (computer's) move.
const crypto = require("crypto");

const KEY_SIZE = 32;
// Generate a 256-bit random key
const key = crypto.randomBytes(KEY_SIZE);

// Convert the key to hexadecimal string
const keyHex = key.toString('hex');

// createHash = (string) => hash = crypto.createHash('sha3-256').update(string).digest('hex').toLowerCase();

module.exports.generateKey = function () {
    return keyHex;
};
