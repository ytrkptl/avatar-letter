const { base } = require("./");

const handleDataRequestTwo = (tableName, filterByFormula, next) => {
  try {
    const table = base(tableName);
    let data = [];

    return new Promise((resolve, reject) => {
      table
        .select({ filterByFormula: filterByFormula })
        .firstPage(function (err, records) {
          if (err) {
            console.error(err);
            reject();
          }
          records.forEach(function (record) {
            data.push(record.fields);
          });
          resolve(data[0]);
        });
    });
  } catch (error) {
    return next({
      messageForLog: `error occurred line 25 airtable-helper ` + error.message,
      status: 400,
      message:
        "Oops! Something went wrong. Please try again or reach out for further help.",
    });
  }
};

module.exports = {
  handleDataRequestTwo,
};
