import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import UserForm from "../components/UserForm";
import { createUser } from "../reducers/userReducer";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SignUpPage = () => {

    // ref
    const userFormRef = useRef()

    // router
    const history = useHistory()

    // redux
    const dispatch = useDispatch()

    // handle sign up
    const handleSignUp = (event) => {
        event.preventDefault()
        const email = userFormRef.current.email
        const password = userFormRef.current.password
        dispatch(createUser(email, password))
    }

    return (
        <UserForm handleSubmit={handleSignUp} ref={userFormRef}>
            <Button variant="primary" type="submit">Sign Up</Button>
            <Button variant="secondary" onClick={() => history.push("/")}>Back</Button>
        </UserForm>
    )
}

export default SignUpPage