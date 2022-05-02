import React, { useImperativeHandle, useState } from "react";
import { Col, FloatingLabel, Form } from "react-bootstrap";
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
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                    <Form.Control type="email" onChange={({ target }) => setEmail(target.value)} />
                </FloatingLabel>
            </Form.Group>
            <Form.Group>
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" onChange={({ target }) => setPassword(target.value)} />
                </FloatingLabel>
            </Form.Group>
            {props.children}
        </Form>
        
    )
})

export default UserForm