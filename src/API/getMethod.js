import apiUrl from "../constant/apiUrl";
import apiToken from "../helpers/apiKeyGenerator";

const getMethod = async (endpoint, params) => {
    return new Promise(function (resolve, reject) {
        fetch(`${apiUrl}${endpoint}?${apiToken()}${params}`)
            .then(response => resolve(response.json()))
            .catch(error => reject(error));
    });
}

export default getMethod;