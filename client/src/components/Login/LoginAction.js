import axios from "axios";

export const LOGIN = 'LOGIN';
export const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
export const LOGIN_GOOGLE = 'LOGIN_GOOGLE';

/* ========================= LOG IN ========================= */
function OnClickLogin(email, password) {
    return axios.post('https://apiclientwebsitethuegiasu.herokuapp.com/user/login', {
        email, password
    }).catch(error => {
        return error;
    });
}

export const login = (res) => ({
    type: LOGIN,
    data: {res}
});

export const loginRequest = (email, password) => {
    return dispatch => {
        return OnClickLogin(email, password).then(res => {
            dispatch(login(res));
        })
    }
};

/* ========================= LOG IN FACEBOOK ========================= */
export const loginFB = (res, typeUser) => ({
    type: LOGIN_FACEBOOK,
    data: {res, typeUser}
});

/* ========================= LOG IN GOOGLE ========================= */
export const loginGG = (res, typeUser) => ({
    type: LOGIN_GOOGLE,
    data: {res, typeUser}
});
