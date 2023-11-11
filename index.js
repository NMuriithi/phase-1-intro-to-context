//document.addEventListener('DOMContentLoaded', (event) => {
    function createEmployeeRecord(employee) {
        return {
          firstName: employee[0],
          familyName: employee[1],
          title: employee[2],
          payPerHour: employee[3],
          timeInEvents: [],
          timeOutEvents: []
        };
      }
      function createEmployeeRecords(employees) {
        return employees.map(createEmployeeRecord);
      }
      
      function createTimeInEvent(employeeRecord, dateStamp) {
        const [date, hour] = dateStamp.split(' ');
        employeeRecord.timeInEvents.push({
          type: "TimeIn",
          hour: parseInt(hour, 10),
          date,
        });
        return employeeRecord;
      }
      function createTimeOutEvent(employeeRecord, dateStamp) {
        const [date, hour] = dateStamp.split(' ');
        employeeRecord.timeOutEvents.push({
          type: "TimeOut",
          hour: parseInt(hour, 10),
          date,
        });
        return employeeRecord;
      }
      function hoursWorkedOnDate(employeeRecord, date) {
        const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
        const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
        return (timeOutEvent.hour - timeInEvent.hour) / 100;
      }
      
      function wagesEarnedOnDate(employeeRecord, date) {
        const hours = hoursWorkedOnDate(employeeRecord, date);
        return hours * employeeRecord.payPerHour;
      }
      
      function allWagesFor(employeeRecord) {
        const dates = employeeRecord.timeInEvents.map(event => event.date);
        const wages = dates.map(date => wagesEarnedOnDate(employeeRecord, date));
        return wages.reduce((total, wage) => total + wage, 0);
      }
      
      function calculatePayroll(employeeRecords) {
        const wages = employeeRecords.map(employeeRecord => allWagesFor(employeeRecord));
        return wages.reduce((total, wage) => total + wage, 0);
      }
      