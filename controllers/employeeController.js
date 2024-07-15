const employeeService = require('../services/employeeService');

// Helper function to format responses
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

// General function to find employees based on different criteria
const findEmployeesByCriteria = async (criteria, res) => {
  try {
    const result = await criteria;
    sendResponse(res, true, result);
  } catch (error) {
    sendResponse(res, false, null, error.message);
  }
};

exports.findEmployees = async (req, res) => {
  const { role, department, reportingManager } = req.query;
  const { employeeIds, employeeNames, startDate, endDate, mobileNumber } = req.body;

  if (role || department || reportingManager) {
    return findEmployeesByCriteria(employeeService.findEmployeesByCriteria(role, department, reportingManager), res);
  } else if (startDate && endDate) {
    return findEmployeesByCriteria(employeeService.findEmployeesByDOB(startDate, endDate), res);
  } else if (employeeIds) {
    return findEmployeesByCriteria(employeeService.findEmployeesByIds(employeeIds), res);
  } else if (employeeNames) {
    return findEmployeesByCriteria(employeeService.findEmployeesByNames(employeeNames), res);
  } else if (mobileNumber) {
    return findEmployeesByCriteria(employeeService.findEmployeeByMobileNumber(mobileNumber), res);
  } else {
    return res.status(400).json({ status: 0, message: 'Invalid search criteria' });
  }
};

exports.findEmployeesByMobile = async (req, res) => {
  const { mobileNumber } = req.body;
  findEmployeesByCriteria(employeeService.findEmployeeByMobileNumber(mobileNumber), res);
};

exports.findEmployeesByDOB = async (req, res) => {
  const { startDate, endDate } = req.body;
  findEmployeesByCriteria(employeeService.findEmployeesByDOB(startDate, endDate), res);
};

// Method for bulk entries
exports.bulkInsertEmployees = async (req, res) => {
  const employees = req.body;

  try {
    const result = await employeeService.bulkInsertEmployees(employees);
    sendResponse(res, true, result, "Data entry successful");
  } catch (error) {
    sendResponse(res, false, null, error.message);
  }
};
