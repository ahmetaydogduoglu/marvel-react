import getMethod from "../API/getMethod"

//chactacters get with limit and offset
export const getCharactersList = async (params) => getMethod("/characters", params);



