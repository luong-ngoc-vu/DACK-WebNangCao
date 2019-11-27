import axios from "axios";

export const LOGIN = 'LOGIN';
export const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
export const LOGIN_GOOGLE = 'LOGIN_GOOGLE';

/* ========================= LOG IN ========================= */
function OnClickLogin(username, password) {
    return axios.post('http://localhost:4000/user/login', {
        username, password
    }).catch(error => {
        return error;
    });
}

export const login = (username, password, res) => ({
    type: LOGIN,
    data: {
        username, password, res
    }
});

export const loginRequest = (username, password) => {
    return dispatch => {
        return OnClickLogin(username, password).then(res => {
            dispatch(login(username, password, res));
        })
    }
};

/* ========================= LOG IN FACEBOOK ========================= */
export const loginFB = (res) => ({
    type: LOGIN_FACEBOOK,
    data: {res}
});

/* ========================= LOG IN GOOGLE ========================= */
export const loginGG = (res) => ({
    type: LOGIN_GOOGLE,
    data: {res}
});
