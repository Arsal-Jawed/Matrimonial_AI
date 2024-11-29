const bcrypt = require('bcrypt');

function Encrypt(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        reject(err);
      } else {
        resolve(hashedPassword);
      }
    });
  });
}

function Decrypt(password, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        console.log("Password match:", isMatch);
        resolve(isMatch);
      }
    });
  });
}

module.exports = { Encrypt, Decrypt };
