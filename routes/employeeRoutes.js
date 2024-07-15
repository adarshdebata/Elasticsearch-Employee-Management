const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { validateEmployeeSearch, validateBulkInsert } = require('../middlewares/validateRequest');
const checkDuplicateIds = require('../middlewares/checkDuplicateIds');

// Route to get employees by role, department, or reporting manager
router.get('/employees', validateEmployeeSearch, employeeController.findEmployees);

// Route to get employees by multiple IDs or names
router.post('/employees/details', validateEmployeeSearch, employeeController.findEmployeesByIdsOrNames);

// Route to get employees by DOB range
router.post('/employees/details/dob', validateEmployeeSearch, employeeController.findEmployeesByDOB);

// Route to get employees by mobile number
router.post('/employees/details/mobile', validateEmployeeSearch, employeeController.findEmployeesByMobile);

// Route for bulk insert
router.post('/employees/bulk', validateBulkInsert, checkDuplicateIds, employeeController.bulkInsertEmployees);

module.exports = router;
