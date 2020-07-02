import {getMethod} from "../API/methods"

//chactacters get with limit and offset
export const getCharactersList = async (params) => getMethod("/characters", params);



