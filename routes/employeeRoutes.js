const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { validateEmployeeSearch, validateBulkInsert } = require('../middlewares/validateRequest');
const checkDuplicateIds = require('../middlewares/checkDuplicateIds');

router.get('/employees', validateEmployeeSearch, employeeController.findEmployees);
router.post('/employees', validateEmployeeSearch, employeeController.findEmployees);
router.post('/employees/dob', validateEmployeeSearch, employeeController.findEmployeesByDOB);
router.post('/employees/mobile', validateEmployeeSearch, employeeController.findEmployeesByMobile);

// Route for bulk insert
router.post('/employees/bulk', validateBulkInsert, checkDuplicateIds,employeeController.bulkInsertEmployees);

module.exports = router;
