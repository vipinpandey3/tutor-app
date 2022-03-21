class Redis {
    static get(key) {
        return global.CACHE_OBJ.get(key);
    }

    static set(key, value) {
        return global.CACHE_OBJ.set(key, JSON.stringify(data));
    }

    static cacheDataAndReturn(key, callback, params, ttl) {
        if(!process.env.TO_CACHE_DATA) {
            callback.apply(null, params)
            .then((result) => {
                Promise.resolve(result)
            })
            .catch(error => {
                Promise.reject(error)
            })
        } else {
            return global.CACHE_OBJ.get(key)
            .then(cachedData => {
                if(cachedData) return Promise.resolve(JSON.parse(cachedData));
                return callback.apply(null, params)
                .then((result) => {
                    try {
                        global.CACHE_OBJ.set(key, JSON.stringify(result), 'EX', ttl)
                    } catch (error) {
                        return Promise.resolve(result)
                    }

                    return Promise.resolve(result)
                })
                .catch(error => {
                    return Promise.reject(error)
                })
            })
            .catch((e) => callback.apply(null, params))
        }
    } 
}

module.exports = Redis