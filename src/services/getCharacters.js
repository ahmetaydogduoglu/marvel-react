import { getMethod } from "../API/methods"

//chactacters get with limit and offset
export const getCharactersList = (params) => getMethod("/characters", params);



