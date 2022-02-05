import React, {useReducer} from  'react';
import { v4 as uuidv4 } from 'uuid'
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        user: null,
        isAuthenticated: null,
        loading: true,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Some actions
    const register = async FormData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post('/api/users', FormData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            })
            loadUser();
        }
        catch (e) {
            dispatch({
                type: REGISTER_FAIL,
                payload: e.response.data.msg
            })
        }
    }

    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const response = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: response.data
            })
        }
        catch (e) {
            dispatch({
                type: AUTH_ERROR,
            })
        }
    }

    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post('/api/auth', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
            loadUser();
        }
        catch (e) {
            dispatch({
                type: LOGIN_FAIL,
                payload: e.response.data.msg
            })
        }
    }

    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }

    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    };


    return <AuthContext.Provider value = {{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
    }}>
        {props.children}
    </AuthContext.Provider>

};

export default AuthState;