import axios from "axios";
const baseURL = 'http://localhost:3001/map'

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