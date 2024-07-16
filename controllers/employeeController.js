/**
 * Helper function to format responses
 * @param {object} res - The response object
 * @param {boolean} isSuccess - Whether the operation was successful
 * @param {object} [data=null] - The data to send in the response
 * @param {string} [message=null] - The message to send in the response
 */
const sendResponse = (res, isSuccess, data = null, message = null) => {
  if (isSuccess) {
    if (data && data.length === 0) {
      res.status(200).json({ status: 1, message: "Oops! Looks like nothing here" });
    } else {
      res.status(200).json({ status: 1, message: message || "Data found successfully", data });
    }
  } else {
    res.status(500).json({ status: 0, message });
  }
};

/**
 * General function to find employees based on different criteria
 * @param {Promise} criteria - The criteria to find employees
 * @param {object} res - The response object
 */
const findEmployeesByCriteria = async (criteria, res) => {
  try {
    const result = await criteria;
    sendResponse(res, true, result);
  } catch (error) {
    sendResponse(res, false, null, error.message);
  }
};

/**
 * Finds employees based on role, department, or reporting manager.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {Promise<void>}
 * 
 * @example
 * // Example response for status 200
 * {
 *   "status": 1,
 *   "message": "Data found successfully",
 *   "data": [ ...employeeData ]
 * }
 */
exports.findEmployees = async (req, res) => {
  const { role, department, reportingManager } = req.query;
  findEmployeesByCriteria(employeeService.findEmployeesByCriteria(role, department, reportingManager), res);
};

/**
 * Finds employees by their IDs or names.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {Promise<void>}
 * 
 * @example
 * // Example response for status 200
 * {
 *   "status": 1,
 *   "message": "Data found successfully",
 *   "data": [ ...employeeData ]
 * }
 */
exports.findEmployeesByIdsOrNames = async (req, res) => {
  const { employeeIds, employeeNames } = req.body;

  if (employeeIds) {
    return findEmployeesByCriteria(employeeService.findEmployeesByIds(employeeIds), res);
  } else if (employeeNames) {
    return findEmployeesByCriteria(employeeService.findEmployeesByNames(employeeNames), res);
  } else {
    return res.status(400).json({ status: 0, message: 'Invalid search criteria' });
  }
};

/**
 * Finds employees by their mobile number.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {Promise<void>}
 * 
 * @example
 * // Example response for status 200
 * {
 *   "status": 1,
 *   "message": "Data found successfully",
 *   "data": [ ...employeeData ]
 * }
 */
exports.findEmployeesByMobile = async (req, res) => {
  const { mobileNumber } = req.body;
  findEmployeesByCriteria(employeeService.findEmployeeByMobileNumber(mobileNumber), res);
};

/**
 * Finds employees by their date of birth.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {Promise<void>}
 * 
 * @example
 * // Example response for status 200
 * {
 *   "status": 1,
 *   "message": "Data found successfully",
 *   "data": [ ...employeeData ]
 * }
 */
exports.findEmployeesByDOB = async (req, res) => {
  const { startDate, endDate } = req.body;
  findEmployeesByCriteria(employeeService.findEmployeesByDOB(startDate, endDate), res);
};

/**
 * Bulk inserts employees.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {Promise<void>}
 * 
 * @example
 * // Example response for status 200
 * {
 *   "status": 1,
 *   "message": "Data entry successful",
 *   "data": [ ...insertedEmployeeData ]
 * }
 */
exports.bulkInsertEmployees = async (req, res) => {
  const employees = req.body;

  if (!Array.isArray(employees)) {
    return res.status(400).json({ status: 0, message: 'Invalid input format. Expected an array of employees.' });
  }

  try {
    const result = await employeeService.bulkInsertEmployees(employees);
    sendResponse(res, true, result, "Data entry successful");
  } catch (error) {
    sendResponse(res, false, null, error.message);
  }
};
