import axios from 'axios'

class AxiosHelper  {
    sendRequest(url, method, token, payload) {
        return new Promise((resolve) => {
            const headers = {
                "Accept": "application/json",
				"Content-Type": "application/json",
            }
            // console.log('Method', method, "token ", token)
            if (token) headers["Authorization"] = token;

            const requestOptions = {
                url: url,
                method: method,
                headers: headers,
                data: payload
            }
            return axios(requestOptions).then(response => {
                return this.resolveResponse(null, response, resolve)
            })
            .catch(error => {
                console.log('Error ============>', error)
                return this.resolveResponse(error,null, resolve)
            })
        });
    }


    resolveResponse(error, response, callback) {
        try {
            if(response && response.data) {
                let result = response.data && response.data.resultShort === "success" ? response.data : null;
                return callback(result);
            } else if (error && error.response) return callback({ error: error.response, result: null });
            else {
                return callback({ error: "Something went wrong. Unable to capture error values" });
            }
        } catch (error) {
            return callback({ error: "Connection error", result: null });
        }
    }
}

const axiosHelper = new AxiosHelper();

export default axiosHelper;