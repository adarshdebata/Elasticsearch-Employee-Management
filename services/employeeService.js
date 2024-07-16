const client = require("../config/elastic");

const mapResponseToSource = (response) =>
  response.hits.hits.map((hit) => hit._source);

exports.findEmployeesByCriteria = async (
  role,
  department,
  reportingManager
) => {
  const query = {
    bool: {
      must: [],
    },
  };

  if (role) {
    query.bool.must.push({ term: { role } });
  }
  if (department) {
    query.bool.must.push({ term: { department } });
  }
  if (reportingManager) {
    query.bool.must.push({ match: { reporting_manager: reportingManager } });
  }

  const response = await client.search({
    index: "employee_index",
    body: {
      query,
    },
  });

  return mapResponseToSource(response);
};

exports.findEmployeesByDOB = async (startDate, endDate) => {
  const response = await client.search({
    index: "employee_index",
    body: {
      query: {
        range: {
          dob: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
    },
  });

  return mapResponseToSource(response);
};

exports.findEmployeesByIds = async (employeeIds) => {
  const response = await client.mget({
    index: "employee_index",
    body: {
      ids: employeeIds,
    },
  });

  return response.docs.map((doc) => doc._source);
};

exports.findEmployeesByNames = async (employeeNames) => {
  const response = await client.search({
    index: "employee_index",
    body: {
      query: {
        bool: {
          should: employeeNames.map((name) => ({
            match: { employee_name: name },
          })),
          minimum_should_match: 1,
        },
      },
    },
  });

  return mapResponseToSource(response);
};

exports.findEmployeeByMobileNumber = async (mobileNumber) => {
  const response = await client.search({
    index: "employee_index",
    body: {
      query: {
        term: {
          mobile_numbers: mobileNumber,
        },
      },
    },
  });

  return mapResponseToSource(response);
};

exports.bulkInsertEmployees = async (employees) => {
  const bulkBody = employees.flatMap((emp) => [
    { index: { _index: "employee_index", _id: emp.id } },
    emp,
  ]);

  const response = await client.bulk({
    refresh: true,
    body: bulkBody,
  });

  if (response.errors) {
    throw new Error("Error in bulk insertion");
  }

  return response;
};
