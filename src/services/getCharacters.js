import getMethod from "../API/getMethod"

//chactacters get with limit and offset
export const getCharactersList = async (limit, offset) => getMethod("/characters", `&limit=${limit}&offset=${offset}`);



