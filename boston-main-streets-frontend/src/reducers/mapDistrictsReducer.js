import mapService from "../services/mapService"

const mapDistrictsReducer = (state = null, action) => {
    switch (action.type) {
        case ("INIT_DISTRICTS"):
            return action.data.districtsData
        case ("SET_DISTRICTS"):
            return action.data.districtsData
        default:
            return state
    }
}

export default mapDistrictsReducer

export const initMapDistricts = () => {
    return async (dispatch) => {
        const districtsData = await mapService.getBostonDistricts()
        dispatch({
            type: "INIT_DISTRICTS",
            data: {
                districtsData: districtsData
            }
        })
    }
}

export const setMapDistricts = (districtsData) => {
    return {
        type: "SET_DISTRICTS",
        data: {
            districtsData: districtsData
        }
    }
}