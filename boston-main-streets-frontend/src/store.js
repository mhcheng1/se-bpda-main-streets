import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import districtReducer from "./reducers/districtReducer";
import mapBoundaryReducer from "./reducers/mapBoundaryReducer";
import mapDistrictsReducer from "./reducers/mapDistrictsReducer";
import businessReducer from "./reducers/businessReducer";

const reducer = combineReducers({
    district: districtReducer,
    mapBoundary: mapBoundaryReducer,
    mapDistricts: mapDistrictsReducer,
    business: businessReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store