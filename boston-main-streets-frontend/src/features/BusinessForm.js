import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import InputItem from "../components/InputItem";

const BusinessForm = ({business}) => {

    // states
    const [name, setName] = useState(business.business_name)
    const [address, setAddress] = useState(business.street_address)
    const [code, setCode] = useState(business.ZIP_code)
    const [employment, setEmployment] = useState(business.estimated_employment)

    // input labels
    const inputs = [
        { label: "Business Name", type: "text", value: name, handleChange: (value) => setName(value) },
        { label: "Address", type: "text", value: address, handleChange: (value) => setAddress(value) },
        { label: "Zip Code", type: "number", value: code, handleChange: (value) => setCode(value) },
        { label: "Employment Size", type: "number", value: employment, handleChange: (value) => setEmployment(value) },
    ]

    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(business)
        const {business_name, street_address, ZIP_code, estimated_employment, ...oldData} = business
        const newData = {
            business_name: name,
            street_address: address,
            ZIP_code: code,
            estimated_employment: employment,
            ...oldData
        }
        console.log(newData)
    }

    return (
        <Form onSubmit={(event) => handleSubmit(event)}>
            {inputs.map((input, index) => (
                <InputItem
                    key={index} label={input.label} type={input.type} value={input.value}
                    handleChange={input.handleChange}
                />
            ))}
            <Button variant="primary" type="submit">Update</Button>
        </Form>
    )
}

export default BusinessForm