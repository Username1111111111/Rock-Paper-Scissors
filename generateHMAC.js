// Makes own (computer's) move & calculates HMAC (based on SHA2 or SHA3) from the own move as a message with the generated key, displays the HMAC to the user.
const crypto = require("crypto");

module.exports.generateHMAC = function (key,message) {
    // Calling createHmac method
    let hmac = crypto.createHmac('sha3-256', key).update(message).digest('hex');
    return hmac;
};
