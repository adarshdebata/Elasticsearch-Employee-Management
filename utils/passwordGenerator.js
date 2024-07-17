// const fs = require('fs');
// const path = require('path');

const generatePassword = () => {
  const length = 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const specialChars = "@$";
  let password = "";

  for (let i = 0, n = charset.length; i < length - 1; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }

  // Ensure at least one special character is included
  password += specialChars.charAt(
    Math.floor(Math.random() * specialChars.length)
  );

  // Shuffle the characters to ensure the special character isn't always at the end
  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
};

//   const saveCredentialsToFile = (username, password) => {
//     const filePath = path.join(__dirname, '..', 'credentials.txt');
//     const credentials = `Username: ${username}\nPassword: ${password}`;

//     fs.writeFileSync(filePath, credentials, { flag: 'w' });
//   };

module.exports = generatePassword;

module.exports = { generatePassword };
