import { auth } from "../constants";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

const userReducer = (state = null, action) => {
    switch (action.type) {
        case ("INIT_USER"):
            return action.data.user
        case ("CREATE_USER_AND_LOGIN"):
            return action.data.user
        case ("USER_LOGIN"):
            return action.data.user
        case ("USER_LOGOUT"):
            return null
        default:
            return state
    }
}

export default userReducer

export const initUser = () => {
    return (dispatch) => {
        onAuthStateChanged(auth, (user) => {
            dispatch({
                type: "INIT_USER",
                data: {
                    user: user
                }
            })
        })
    }
}

export const createUser = (email, password) => {
    return async (dispatch) => {
        try {
            const userCredentail = await createUserWithEmailAndPassword(auth, email, password)
            dispatch({
                type: "CREATE_USER_AND_LOGIN",
                data: {
                    user: userCredentail.user
                }
            })
        } catch (error) {
            window.alert("Invalid email or password")
            console.log(error.message)
        }
    }
}

export const userLogin = (email, password) => {
    return async (dispatch) => {
        try {
            const userCredentail = await signInWithEmailAndPassword(auth, email, password)
            dispatch({
                type: "USER_LOGIN",
                data: {
                    user: userCredentail.user
                }
            })
        } catch (error) {
            window.alert("Invalid email or password")
            console.log(error.message)
        }
    }
}

export const userLogout = () => {
    return async (dispatch) => {
        await signOut(auth)
        dispatch({
            type: "USER_LOGOUT"
        })
    }
}