let mung = require('express-mung');

let findInCache = (req, res, next) => {
    let cache_key = req.user.lastName + "_" + req.user.emailId + "_" + req.user.role;
    global.CACHE_OBJ.get(cache_key)
    .then(data => {
        if(data) res.send(JSON.parse(data));
        else next();
    })
    .catch(error => {
        console.error(error);
        next();
    });
}

let cacheResponse = (body, req, next) => {
    try {
        let cache_key = req.user.lastName + "_" + req.user.emailId + "_" + req.user.role;
        const expiry_time = (60 * 60 * 4);
        if (expiry_time)
        global.CACHE_OBJ.set(cache_key, JSON.stringify(body), 'EX', expiry_time);
      else
        global.CACHE_OBJ.set(cache_key, JSON.stringify(body));
    } catch (error) {
        console.error(error);
    }
}

if (process.env.TO_CACHE_DATA)
  module.exports = [findInCache, mung.json(cacheResponse)];
else
  module.exports = [];