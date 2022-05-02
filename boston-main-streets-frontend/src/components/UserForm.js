import React, { useImperativeHandle, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const UserForm = React.forwardRef((props, ref) => {

    // states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // router
    const history = useHistory()

    useImperativeHandle(ref, () => {
        return {
            email, password
        }
    })

    return (
        <Form onSubmit={(event) => props.handleSubmit(event)}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={({ target }) => setEmail(target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={({ target }) => setPassword(target.value)} />
            </Form.Group>
            {props.children}
        </Form>
    )
})

export default UserForm