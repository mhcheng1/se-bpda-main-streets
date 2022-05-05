import axios from "axios";
const prefix = (window.location.hostname === "localhost") ? (process.env.REACT_APP_URL_BACKEND) : ""
const baseURL = `${prefix}/api/business`

// const baseURL = '/api/business'

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
