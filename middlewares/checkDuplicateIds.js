// middleware/checkDuplicateIds.js
const client = require('../config/elastic');

const checkDuplicateIds = async (req, res, next) => {
  const ids = req.body.map(emp => emp.id);

  try {
    const response = await client.mget({
      index: 'employee_index',
      body: {
        ids
      }
    });

    const duplicateIds = response.docs.filter(doc => doc.found).map(doc => doc._id);

    if (duplicateIds.length > 0) {
      return res.status(200).json({
        status: 1,
        message: "Data already exists, can't create new with matching ID(s)",
        duplicateIds: duplicateIds
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};

module.exports = checkDuplicateIds;
