import getMethod from "../API/getMethod"

//character detail get
export const getCharacterDetail = (characterId) => getMethod(`/characters/${characterId}`, "");

//This comics belong to call with id character
export const getCharacterComics = async (characterId, dateRange, limit) => getMethod(`/characters/${characterId}/comics`, `&dateRange=2005-01-01,2020-12-12&limit=${limit}`);

