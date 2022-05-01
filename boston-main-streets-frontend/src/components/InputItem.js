import React, { useState } from "react";
import { Form } from "react-bootstrap";

const InputItem = ({label, type, value, handleChange}) => {

    const [inputValue, setInputValue] = useState(value)

    // handle change
    const handleInputChange = (target) => {
        setInputValue(target.value)
        if (target.type === "number") {
            handleChange(Number(target.value))
        } else {
            handleChange(target.value)
        }
    }

    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} value={inputValue} onChange={({ target }) => {handleInputChange(target)}}/>
        </Form.Group>
    )
}

export default InputItem