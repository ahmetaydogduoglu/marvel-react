import { getMethod } from "../API/methods"

export const getComics = (params) => getMethod("/comics", params);