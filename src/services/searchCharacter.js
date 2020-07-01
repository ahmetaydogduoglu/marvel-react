import getMethod from "../API/getMethod"

//chactacters get with limit and offset
export const searchCharacter = async (characterName) => getMethod("/characters", `&nameStartsWith=${characterName}`);



