import React from "react";
import { Form } from "react-bootstrap";
import { nameRule } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { changeDistrict } from "../reducers/districtReducer";
import { useHistory } from "react-router-dom";

const DistrictList = () => {

    // redux states
    const districtName = useSelector(({district}) => district)
    const bostonDistricts = useSelector(({ mapDistricts }) => mapDistricts)

    // redux and router hooks
    const dispatch = useDispatch()
    const history = useHistory()

    // wait for loading
    if (!districtName || !bostonDistricts) {
        return (
            <div>loading...</div>
        )
    }

    // get boston districts data
    const bostonDistrictsName = bostonDistricts.features.map((district) => (district.properties.DIST_NAME.replace(nameRule, "-")))

    // list white background
    const listStyle = {
        "background": "white"
    }

    // handle list selection
    const handleChange = (name) => {
        dispatch(changeDistrict(name))
    }

    return (
        <Form>
            <div style={listStyle}>
                {bostonDistrictsName.map((name, index) => {
                    if (name === districtName) {
                        return (
                            <Form.Check
                                key={index} label={name} name="list" type="radio" checked
                                id={`inline-list-${index}`} onChange={() => handleChange(name)}
                            />
                        )
                    } else {
                        return (
                            <Form.Check
                                key={index} label={name} name="list" type="radio"
                                id={`inline-list-${index}`} onChange={() => handleChange(name)}
                            />
                        )
                    }
                })}
            </div>
        </Form>
    )
}

export default DistrictList