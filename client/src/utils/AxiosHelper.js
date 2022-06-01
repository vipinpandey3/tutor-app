import axios from 'axios'

class AxiosHelper  {
    sendRequest(url, baseUrl, method, token, payload) {
        return new Promise((resolve) => {
            const mainURL = (baseUrl || "") + url;
            const headers = {
                "Accept": "application/json",
				"Content-Type": "application/json",
            }
            if (token) headers["Authorization"] = token;

            const requestOptions = {
                url: mainURL,
                method: method,
                headers: headers,
                data: payload
            }
            return axios(requestOptions).then(response => {
                console.log("Response", response);
                return this.resolveResponse(null, response, resolve)
            })
            .catch(error => this.resolveResponse(error,null, resolve))
        });
    }


    resolveResponse(error, response, callback) {
        try {
            if(response && response.data) {
                return callback({
                    result: (response.data && response.data.result) || null
                });
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