import apiToken from "../helpers/md5Generator"
const apiKeyGenerator = () => `ts=1&apikey=${process.env.REACT_APP_API_PUBLIC_KEY}&hash=${apiToken()}`
export default apiKeyGenerator
