const { generatePassword, saveCredentialsToFile } = require('../utils/passwordGenerator');

const username = 'admin';
const password = generatePassword();

// Save the credentials to a file
// saveCredentialsToFile(username, password);

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="API Documentation"');
    return res.status(401).json({ status: 0, message: 'Unauthorized' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [providedUsername, providedPassword] = credentials.split(':');

  if (providedUsername === username && providedPassword === password) {
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="API Documentation"');
    res.status(401).json({ status: 0, message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
module.exports.username = username;
module.exports.password = password;
