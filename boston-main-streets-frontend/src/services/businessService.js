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

const getOneBusiness = async (districtName, id) => {
    const res = await axios.get(`${baseURL}/${districtName}/${id}`)
    return res.data
}

const updateOneBusiness = async (districtName, id, newData) => {
    const res = await axios.put(`${baseURL}/${districtName}/${id}`, newData)
    return res.data
}

export default {
    getAllBusiness,
    getDistrictBusiness,
    getOneBusiness,
    updateOneBusiness
}