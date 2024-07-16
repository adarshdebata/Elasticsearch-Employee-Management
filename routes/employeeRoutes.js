const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { validateEmployeeSearch, validateBulkInsert } = require('../middlewares/validateRequest');
const checkDuplicateIds = require('../middlewares/checkDuplicateIds');

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         role:
 *           type: string
 *         department:
 *           type: string
 *         reportingManager:
 *           type: string
 *         mobileNumber:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 */

/** 
 * @swagger
 * /employees:
 *   get:
 *     summary: Retrieve a list of employees based on Role, Department, Reporting manager, if none is given retrive all data 
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Role of the employees to filter
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Department of the employees to filter
 *       - in: query
 *         name: reportingManager
 *         schema:
 *           type: string
 *         description: Reporting manager of the employees to filter
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Data found successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *     tags:
 *       - Employees
 *     x-codeSamples:
 *       - lang: cURL
 *         source: |
 *           curl -X GET "http://localhost:3000/employees" -H "accept: application/json"
 */
router.get('/employees', validateEmployeeSearch, employeeController.findEmployees);

/**
 * @swagger
 * /employees/details:
 *   post:
 *     summary: Retrieve employees by IDs or names
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               employeeNames:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Data found successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid search criteria
 *     tags:
 *       - Employees
 *     x-codeSamples:
 *       - lang: cURL
 *         source: |
 *           curl -X POST "http://localhost:3000/employees/details" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"employeeIds\": [\"id1\", \"id2\"], \"employeeNames\": [\"name1\", \"name2\"] }"
 */
router.post('/employees/details', validateEmployeeSearch, employeeController.findEmployeesByIdsOrNames);

/**
 * @swagger
 * /employees/details/dob:
 *   post:
 *     summary: Retrieve employees by date of birth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-07-16"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-07-16"
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Data found successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid date format
 *     tags:
 *       - Employees
 *     x-codeSamples:
 *       - lang: cURL
 *         source: |
 *           curl -X POST "http://localhost:3000/employees/details/dob" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"startDate\": \"2024-07-16\", \"endDate\": \"2024-07-16\" }"
 */
router.post('/employees/details/dob', validateEmployeeSearch, employeeController.findEmployeesByDOB);

/**
 * @swagger
 * /employees/details/mobile:
 *   post:
 *     summary: Retrieve employees by mobile number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Data found successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid mobile number format
 *     tags:
 *       - Employees
 *     x-codeSamples:
 *       - lang: cURL
 *         source: |
 *           curl -X POST "http://localhost:3000/employees/details/mobile" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"mobileNumber\": \"+1234567890\" }"
 */
router.post('/employees/details/mobile', validateEmployeeSearch, employeeController.findEmployeesByMobile);

/**
 * @swagger
 * /employees/bulk:
 *   post:
 *     summary: Bulk insert employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Data entry successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Data entry successful"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Bad request/Invalid input format. Expected an array of employees.
 *     tags:
 *       - Employees
 *     x-codeSamples:
 *       - lang: cURL
 *         source: |
 *           curl -X POST "http://localhost:3000/employees/bulk" -H "accept: application/json" -H "Content-Type: application/json" -d "[ { \"id\": \"1\", \"name\": \"John Doe\", \"role\": \"Developer\" }, { \"id\": \"2\", \"name\": \"Jane Doe\", \"role\": \"Manager\" } ]"
 */
router.post('/employees/bulk', validateBulkInsert, checkDuplicateIds, employeeController.bulkInsertEmployees);

module.exports = router;
