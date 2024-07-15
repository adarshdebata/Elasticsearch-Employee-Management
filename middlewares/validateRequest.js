const { check, validationResult } = require("express-validator");

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 0, message: "Bad Request", errors: errors.array() });
  }
  next();
};

// Validation rules for employee search
const validateEmployeeSearch = [
  check("mobileNumber").optional().isMobilePhone().withMessage("Input a valid mobile number")
  ,
  check("role").optional().isString().withMessage("Role must be a string"),
  
  check("department").optional().isString().withMessage("Department must be a string"),
  
  check("reportingManager").optional().isString().withMessage("Reporting Manager must be a string"),
  
  check("employeeIds").optional().isArray().withMessage("Employee IDs must be an array"),
  
  check("employeeNames").optional().isArray().withMessage("Employee names must be an array"),
  
  check("startDate").optional().isISO8601().withMessage("Start date must be in YYYY-MM-DD format"),
  
  check("endDate").optional().isISO8601().withMessage("End date must be in YYYY-MM-DD format"),
  
  validateRequest,
];

// Validation rules for bulk insert
const validateBulkInsert = [
  check('*.id').not().isEmpty().withMessage('ID is required'),
  check('*.employee_name').not().isEmpty().withMessage('Employee name is required'),
  check('*.dob').isISO8601().withMessage('DOB must be in YYYY-MM-DD format'),
  validateRequest,
];

module.exports = { validateEmployeeSearch, validateBulkInsert };
