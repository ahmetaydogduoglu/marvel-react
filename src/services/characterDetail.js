import { getMethod } from "../API/methods"

//character detail get
export const getCharacterDetail = (characterId) => getMethod(`/characters/${characterId}`, "");

//This comics belong to call with id character
export const getCharacterComics = async (characterId, params) => getMethod(`/characters/${characterId}/comics`, params);

