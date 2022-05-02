const mapBusinessReducer = (state = null, action) => {
    switch (action.type) {
        case ("SET_MAP_BUSINESS"):
            return action.data.business
        case ("REMOVE_MAP_BUSINESS"):
            return null
        default:
            return state
    }
}

export default mapBusinessReducer

export const setMapBusiness = (business) => {
    return {
        type: "SET_MAP_BUSINESS",
        data: {
            business: business
        }
    }
}

export const removeMapBusiness = () => {
    return {
        type: "REMOVE_MAP_BUSINESS"
    }
}