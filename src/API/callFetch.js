import apiUrl from "../constant/apiUrl";
import apiToken from "../helpers/apiKeyGenerator";

const callFetch = (method, endpoint, params = null, body = null) => {
    return new Promise(function (resolve, reject) {
        fetch(`${apiUrl}${endpoint}?${apiToken()}${params}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body !== null ? JSON.stringify(body) : null
        }).then(response => resolve(response.json()))
            .catch(error => reject(error))
    })
}

export default callFetch