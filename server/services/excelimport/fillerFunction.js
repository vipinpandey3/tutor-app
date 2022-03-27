const models = require('../../models/index');

const setBalance = function(student, headValue, cellValue) {
    console.log("Inside the setBalance function");
    if(!student) student={};
    if(cellValue === 0) {
        student['balance'] = 0
        console.log("Inside if Condition when cellValue is 0 ********", student);
    }
    if(!cellValue) {
        student['balance'] = parseFloat(student.feesAmount) - (parseFloat(student.paidAMount) + parseFloat(student.discount));
        console.log("Inside if Condition when cellValue is not there ********", student);
    };
    console.log("Student **********", student);
    return student
}

module.exports = {
    setBalance: setBalance
}