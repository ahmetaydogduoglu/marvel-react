import getMethod from "../API/getMethod"

export const getCharactersList = async (limit, offset) => getMethod("/characters", `&limit=${limit}&offset=${offset}`);



