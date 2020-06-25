import apiToken from "../helpers/md5Generator"

export const getCharactersList = async (limit, offset) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/characters?ts=1&apikey=${process.env.REACT_APP_API_PUBLIC_KEY}&hash=${apiToken()}&limit=${limit}&offset=${offset}`)
        const json = await response.json();
        return json
    } catch (error) {
        alert("There is a problem");
    }
}

