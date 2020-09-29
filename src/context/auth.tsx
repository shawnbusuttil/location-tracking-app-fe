import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-community/async-storage'

import trackerApi from '../api/tracker'
import { AuthAction, AuthContextType, AuthRequest, AuthState } from "../types/Auth";

const INITIAL_STATE: AuthState = {
    token: null,
    isAuthenticating: false
}

const AuthContext = createContext<AuthContextType>({
    state: INITIAL_STATE,
    signup: () => null,
    signin: () => null,
    signout: () => null,
    clearErrors: () => null
})


const authReducer = (state = INITIAL_STATE, action: AuthAction): any => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload,
                isAuthenticating: false,
                error: undefined
            }
        case 'REMOVE_TOKEN': 
            return {
                ...state,
                token: null
            }
        case 'AUTHENTICATE': 
            return {
                ...state,
                isAuthenticating: action.payload
            }
        case 'ADD_ERROR':
            return {
                ...state,
                isAuthenticating: false,
                error: action.payload
            }
        case 'REMOVE_ERROR': {
            return {
                ...state,
                error: undefined
            }
        }
        default:
            return state
    }
}
    
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

    useEffect(() => {
        const authenticate = async () => {
            dispatch({ type: 'AUTHENTICATE', payload: true })
            const token = await AsyncStorage.getItem('token')
            
            if (token) {
                dispatch({ type: 'SET_TOKEN', payload: token })
            }

            dispatch({ type: 'AUTHENTICATE', payload: false })
        }

        authenticate()
    }, [])

    const signup = async ({ email, password }: AuthRequest) => {
        try {
            const response = await trackerApi.post<string>('/signup', { email, password })
            await AsyncStorage.setItem('token', response.data)

            dispatch({ type: "SET_TOKEN", payload: response.data })
        } catch (err) {
            dispatch({ type: "ADD_ERROR", payload: "Something went wrong." })
        }
    }

    const signin = async ({ email, password }: AuthRequest) => {
        try {
            const response = await trackerApi.post<string>('/signin', { email, password })
            await AsyncStorage.setItem('token', response.data)

            dispatch({ type: "SET_TOKEN", payload: response.data })
        } catch (err) {
            dispatch({ type: "ADD_ERROR", payload: "Incorrect details." })
        }
    }

    const signout = async () => {
        await AsyncStorage.removeItem('token')
        dispatch({ type: 'REMOVE_TOKEN' })
    }

    const clearErrors = () => {
        dispatch({ type: 'REMOVE_ERROR' })
    }

    return (
        <AuthContext.Provider value={{
            state,
            signup,
            signin,
            signout,
            clearErrors
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext