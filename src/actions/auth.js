import * as api from '../api';
import { AUTH } from '../constants/actionType';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData);
        const action = { type: AUTH, data }
        dispatch(action);
        navigate('/');
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);
        const action = { type: AUTH, data }
        dispatch(action);
        navigate('/');
    } catch (error) {
        console.log(error)
    }
}