import { initBusiness, setBusiness } from "./businessReducer"

const districtReducer = (state = "Boston", action) => {
    switch (action.type) {
        case ("CHANGE_DISTRICT"):
            return action.data.districtName
        case ("DEFAULT_DISTRICT"):
            return "Boston"
        default:
            return state
    }
}

export default districtReducer

export const changeDistrict = (districtName) => {
    return async (dispatch) => {
        dispatch({
            type: "CHANGE_DISTRICT",
            data: {
                districtName: districtName
            }
        })
        dispatch(setBusiness(districtName))
    }
}

export const defaultDistrict = () => {
    return async (dispatch) => {
        dispatch({
            type: "DEFAULT_DISTRICT"
        })
        dispatch(initBusiness())
    }
}