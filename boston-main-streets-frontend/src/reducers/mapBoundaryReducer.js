import mapService from "../services/mapService"

const mapBoundaryReducer = (state = null, action) => {
    switch (action.type) {
        case ("INIT_BOUNDARY"):
            return action.data.boundaryData
        case ("SET_BOUNDARY"):
            return action.data.boundaryData
        default:
            return state
    }
}

export default mapBoundaryReducer

export const initMapBoundary = () => {
    return async (dispatch) => {
        const boundaryData = await mapService.getBostonBoundary()
        dispatch({
            type: "INIT_BOUNDARY",
            data: {
                boundaryData: boundaryData
            }
        })
    }
}

export const setMapBoundary = (boundaryData) => {
    return {
        type: "SET_BOUNDARY",
        data: {
            boundaryData: boundaryData
        }
    }
}