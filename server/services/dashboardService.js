const moment = require('moment')

const dashboardService = {
    formatChartData: (result) => {
        console.log('Result ===========>', JSON.stringify(result))
        let chartData = []
        return new Promise((resolve, reject) => {
            let obj = {}
            if(result.length < 0) {
                resolve(chartData)
            } else {
                result = JSON.parse(JSON.stringify(result))
                let newObj = [...new Set(result.map((item) => item.attendenceDate))]
                let newArray = [];
                console.log('new Obj =============', newObj)
                // result.forEach((element, index) => {
                //     if(newObj.includes(element.attendenceDate)) {
                newObj.forEach((element) => {
                    obj["attendenceDate"] = element;
                    newArray.push(obj);
                    obj = {};
                })
                delete newObj;
                newArray.forEach((element, index) => {
                    let count = 0
                    result.forEach((ele, index2) => {
                        if(ele.attendenceDate === element.attendenceDate) {
                            count = count + 1
                            obj['numberOfStudent'] = count;
                            obj['attendenceDate'] = ele.attendenceDate;
                            obj = {};
                        }
                    });

                })

                //     }
                // })
                console.log('New Array ========', chartData)
                // result.forEach(element => {
                //     obj[element.attendenceDate] = (obj[element.attendenceDate] || 0) + 1
                // });
                // result.map(ele => {
                //     let count = 0;
                //     if(obj.hasOwnProperty(ele.attendenceDate)) {
                //         count++;
                //         obj[ele.StandardMaster.std] = count;
                //         obj = 
                //     }
                //     count = 0
                // })
                // Object.keys(obj).map(ele => {
                //     let finalObj ={}
                //     let count = 0
                //     result.forEach(element => {
                //         if(element.attendenceDate === ele) {
                //             finalObj['date'] = ele
                //             count++;
                //             finalObj[element.StandardMaster.std] = count
                //         }
                //         chartData.push(finalObj)
                //     })
                // })
                console.log('Chart Lo', chartData)
                resolve(chartData)
            }
        })
    },

    groupArrayObjects: (array, key) => {
        let newObj = {count: 0}
        return array.reduce((accum, obj) => {

            return accum;
        }, [])
    }
}

module.exports = dashboardService