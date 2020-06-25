import apiToken from "../helpers/md5Generator"


export const getCharacterDetail = async (characterId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/characters/${characterId}?ts=1&apikey=${process.env.REACT_APP_API_PUBLIC_KEY}&hash=${apiToken()}`)
        const json = response.json();
        return json
    } catch (error) {
        alert("There is a problem");
    }
}

export const getCharacterComics = async (characterId, dateRange, limit) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/characters/${characterId}/comics?ts=1&apikey=${process.env.REACT_APP_API_PUBLIC_KEY}&hash=${apiToken()}&dateRange=2005-01-01,2020-12-12&limit=${limit}`)
}