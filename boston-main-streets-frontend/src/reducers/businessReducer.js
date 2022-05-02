import businessService from "../services/businessService"

const businessReducer = (state = null, action) => {
    switch (action.type) {
        case ("INIT_BUSINESS"):
            return action.data.businessData
        case ("SET_BUSINESS"):
            return action.data.businessData
        case ("UPDATE_BUSINESS"):
            const newBusiness = action.data.newBusiness
            return state.map((business) => (
                (business.id === newBusiness.id)
                    ? newBusiness
                    : business
            ))
        default:
            return state
    }
}

export default businessReducer

export const initBusiness = () => {
    return async (dispatch) => {
        const businessData = await businessService.getAllBusiness()
        dispatch({
            type: "INIT_BUSINESS",
            data: {
                businessData: businessData
            }
        })
    }
}

export const setBusiness = (districtName) => {
    return async (dispatch) => {
        const businessData = (districtName === "Boston")
            ? await businessService.getAllBusiness()
            : await businessService.getDistrictBusiness(districtName)
        dispatch({
            type: "SET_BUSINESS",
            data: {
                businessData: businessData
            }
        })
    }
}

export const updateBusiness = (districtName, id, newData) => {
    return async (dispatch) => {
        const newBusiness = await businessService.updateOneBusiness(districtName, id, newData)
        dispatch({
            type: "UPDATE_BUSINESS",
            data: {
                newBusiness: newBusiness
            }
        })
    }
}