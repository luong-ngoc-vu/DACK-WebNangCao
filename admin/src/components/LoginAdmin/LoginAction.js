import axios from "axios";

export const LOGIN = 'LOGIN';

/* ========================= LOG IN ========================= */
function OnClickLogin(email, password) {
    return axios.post('http://localhost:4000/admin/login', {
        email, password
    }).catch(error => {
        return error;
    });
}

export const login = (res) => ({
    type: LOGIN,
    data: { res }
});

export const loginRequest = (email, password) => {
    return dispatch => {
        return OnClickLogin(email, password).then(res => {
            dispatch(login(res));
        })
    }
};

