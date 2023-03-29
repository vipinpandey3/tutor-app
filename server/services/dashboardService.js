const dashboardService = {
    formatStudentChartData: (result, studentCount) => {
        let chartData = []
        return new Promise((resolve, reject) => {
            if(result.length < 0) {
                resolve(chartData)
            } else {
                result = JSON.parse(JSON.stringify(result))
                let newObj = [...new Set(result.map((item) => item.attendenceDate))]
                let array = []
                newObj.forEach(element => {
                    let obj = {}
                    let count = result.reduce((count, item) => {
                         return item.attendenceDate == element ? count + 1 : count
                    }, 0)
                    obj["students"] = count
                    obj['date'] = element,
                    obj.totalStudents = studentCount
                    chartData.push(obj)
                    obj = {}
                    
                });
                return resolve(chartData)
            }
        })
    },

    formatTutorsChartData: (result, tutorCount) => {
        let chartData = []
        return new Promise((resolve, reject) => {
            if(result.length < 0) {
                resolve(chartData)
            } else {
                result = JSON.parse(JSON.stringify(result))
                let newObj = [...new Set(result.map((item) => item.attendenceDate))]
                let array = []
                newObj.forEach(element => {
                    let obj = {}
                    let count = result.reduce((count, item) => {
                         return item.attendenceDate == element ? count + 1 : count
                    }, 0)
                    obj["tutors"] = count
                    obj['date'] = element,
                    obj.tutors = tutorCount
                    chartData.push(obj)
                    obj = {}
                    
                });
                return resolve(chartData)
            }

        })
    },

    formateData: (array1, array2, key) => {
        return new Promise((resolve, reject) => {
            let result = [];
            for (let i = 0; i < array1.length; i++) {
                let found = false;
                for (let j = 0; j < array2.length; j++) {
                    if (array1[i][key] === array2[j][key]) {
                        result.push({...array1[i], ...array2[j]});
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    result.push(array1[i]);
                }
            }
            for (let i = 0; i < array2.length; i++) {
                let found = false;
                for (let j = 0; j < array1.length; j++) {
                    if (array2[i][key] === array1[j][key]) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    result.push(array2[i]);
                }
            }

            result.sort((a, b) => {
                if(a.data > b.data) {
                    return 1
                }
                if(a.date < b.date) {
                    return -1
                }
                return 0
            })
            return resolve(result);
        })
    }
}

module.exports = dashboardService