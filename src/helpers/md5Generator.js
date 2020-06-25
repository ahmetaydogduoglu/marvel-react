import md5 from "md5";

const generator = () => {
    return md5(`1${process.env.REACT_APP_API_PRIVATE_KEY}${process.env.REACT_APP_API_PUBLIC_KEY}`)
}

export default generator