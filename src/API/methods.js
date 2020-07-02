import callFetch from "./callFetch"

//get method
export const getMethod = (endpoint, params) => {
    return callFetch("GET", endpoint, params);
}

//post method
export const postMethod = (endpoint, body, params) => {
    return callFetch("POST", endpoint, params, body);
}

//put method
export const putMethod = (endpoint, body, params) => {
    return callFetch("PUT", endpoint, params, body);
}

//delete method
export const deleteMethod = (endpoint, params) => {
    return callFetch("DELETE", endpoint, params);
}
