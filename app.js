// node-cron sheduling
const cron = require("node-cron");
const { countDailyLogins, monitorSuspiciousActivity, countErrorsBySeverity } = require("./index.js");


cron.schedule('0 0 * * *', ()=>{
    console.log('Users logged in')
    countDailyLogins();
})

cron.schedule('*/10 * * * *', ()=>{
    console.log('Monitoring for suspicious activity')
    monitorSuspiciousActivity();
})

cron.schedule('0 0 * * *', ()=>{
    console.log('Counting daily errors by severity')
    countErrorsBySeverity();
})