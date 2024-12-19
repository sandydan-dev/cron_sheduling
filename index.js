require("dotenv").config();
const fs = require("fs");
const { alertEmail, alertThreshold } = require("./config");
const filePath = process.env.LOG_FILE_PATH;

function countDailyLogins() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    let lines = data.split("\n");

    let loggIn = 0;

    lines.forEach((line) => {
      if (line.includes("User logged in")) loggIn++;
    });

    console.log("user logged in: ", loggIn);
    // console.log(loggIn);
  } catch (error) {
    console.log("Error while counting daily logins:", error);
  }
}
// countDailyLogins();

// Question 2: Monitor Suspicious Activity
function monitorSuspiciousActivity() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const lines = data.split("\n");

    const errorLogin = {};

    lines.forEach((line) => {
      if (line.includes("failed login")) {
        const username = line.split(" ")[1];
        errorLogin[username] = (errorLogin[username] || 0) + 1;
      }
    });
    console.log(errorLogin);

    for (const [error, count] of Object.entries(errorLogin)) {
      if (count > alertThreshold) {
        console.log(
          `Alert! ${error} exceeded threshold with ${count} Occurrences. Alert sent to ${alertEmail}`
        );
      }
    }
  } catch (error) {
    console.log("Error while counting daily logins:", error);
  }
}

// monitorSuspiciousActivity();

// Question 3: Total Daily Errors by Severity
function countErrorsBySeverity() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const lines = data.split("\n");

    let errorCount = 0;
    let warnCount = 0;
    let infoCount = 0;

    lines.forEach((line) => {
      if (line.includes("ERROR")) errorCount++;
      if (line.includes("WARN")) warnCount++;
      if (line.includes("INFO")) infoCount++;
    });

    console.log('Daily Errors by Severity:')
    console.log("error: ", errorCount);
    console.log("warn: ", warnCount);
    console.log("info: ", infoCount);
  } catch (error) {
    console.log("Error while counting daily logins:", error);
  }
}

// countErrorsBySeverity();

module.exports = {
  countDailyLogins,
  monitorSuspiciousActivity,
  countErrorsBySeverity
};
