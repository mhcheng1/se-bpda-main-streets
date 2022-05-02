import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../reducers/userReducer";
import UserForm from "../components/UserForm";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const LoginPage = () => {

    // redux
    const dispatch = useDispatch()

    // router
    const history = useHistory()

    // ref
    const userFormRef = useRef()

    // handle login
    const handleLogin = async (event) => {
        event.preventDefault()
        const email = userFormRef.current.email
        const password = userFormRef.current.password
        dispatch(userLogin(email, password))
    }

    return (
        <div>
            <h3>Login</h3>
            <UserForm handleSubmit={handleLogin} ref={userFormRef}>
                <Button variant="primary" type="submit">Login</Button>
                <Button variant="secondary" onClick={() => history.push("/signup")}>Create an account</Button>
                <Button variant="secondary" onClick={() => history.push("/")}>Back</Button>
            </UserForm>
        </div>
    )
}

export default LoginPage