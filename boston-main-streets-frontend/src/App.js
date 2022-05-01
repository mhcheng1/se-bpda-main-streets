import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { initMapBoundary } from "./reducers/mapBoundaryReducer";
import { initMapDistricts } from "./reducers/mapDistrictsReducer";
import { initBusiness } from "./reducers/businessReducer";
import MainPage from "./pages/MainPage";
import BusinessForm from "./features/BusinessForm";

const App = () => {

  // redux states
  const dispatch = useDispatch()

  useEffect(() => {
    // set map boundary data
    dispatch(initMapBoundary())

    // set map districts data
    dispatch(initMapDistricts())

    // set business data
    dispatch(initBusiness())
  }, [dispatch])

  // test
  const test = {
    "FIELD1": 284,
      "ZIP_code": 2134,
        "business_name": "youth center at charles view",
          "employment_buckets": "1 to 9",
            "estimated_employment": 9,
              "id": "-N0y5jr4Px2dF3DvhCQG",
                "latitude": 42.3528,
                  "longitude": -71.1328,
                    "mainstreet": "Allston-Village",
                      "street_address": "75 Stadium Way"
  }
  return (
    <Switch>
      <Route path={"/test"}>
        <BusinessForm business={test}/>
      </Route>
      <Route path={"/"}>
        <MainPage />
      </Route>
    </Switch>
  )
}

export default App