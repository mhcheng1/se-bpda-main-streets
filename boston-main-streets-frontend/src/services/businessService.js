import axios from "axios";
const baseURL = 'http://localhost:3001/business'

const getAllBusiness = async () => {
    const res = await axios.get(baseURL)
    return res.data
}

const getDistrictBusiness = async (districtName) => {
    const res = await axios.get(`${baseURL}/${districtName}`)
    return res.data
}

export default {
    getAllBusiness,
    getDistrictBusiness
}