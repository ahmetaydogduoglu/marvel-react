import apiUrl from "../constant/apiUrl";
import apiToken from "../helpers/apiKeyGenerator"
const getMethod = async (endpoint, params) => {
    //all get method request
    const response = await fetch(`${apiUrl}${endpoint}?${apiToken()}${params}`);
    const json = await response.json();
    return new Promise(function (resolve, reject) {
        if (response.status === 200) {
            //status ok and handle data
            resolve(json);
        } else {
            //error handled
            reject(new Error(json.message));
        }
    })
}

export default getMethod;