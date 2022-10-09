const Bull = require('bull');
const {Process} = require('./process')

const queue = new Bull('queue', {
    redis: {
        host: process.env.CACHE_STORE_URL,
        port: process.env.CACHE_STORE_PORT
    }
});

queue.process(async(job)=> {
    return Process(job)
})

queue.on('completed', job => {
    console.log(`Job with id ${job.id} has been completed`);
  })

const doProcess = (data, type) => {
    return queue.add({type: type, data: data}, { delay: 5000 })
    .then(result => {
        return Promise.resolve(result)
    })
    .catch(error => {
        console.log('Error while uploading Excel', error)
        return Promise.reject(error)
    })
}

module.exports = {
    doProcess: doProcess
}