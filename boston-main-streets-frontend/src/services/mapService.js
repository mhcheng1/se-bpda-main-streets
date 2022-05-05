import axios from "axios";
const prefix = (window.location.hostname === "localhost") ? (process.env.REACT_APP_URL_BACKEND) : ""
const baseURL = `${prefix}/api/map`
// const baseURL = '/api/map'

const getBostonBoundary = async () => {
    const res = await axios.get(`${baseURL}/boundary`)
    return res.data
}

const getBostonDistricts = async () => {
    const res = await axios.get(`${baseURL}/districts`)
    return res.data
}

export default {
    getBostonBoundary,
    getBostonDistricts
}
