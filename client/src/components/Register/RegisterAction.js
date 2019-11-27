import axios from "axios";

export const REGISTER = 'REGISTER';

/* ========================= REGISTER ========================= */
function OnclickRegister(username, name, phone, email, password) {
    return axios.post('http://localhost:4000/user/register', {
        username, name, phone, email, password
    }).catch(error => {
        return error;
    });
}

export const register = (name, phone, username, password, email, res) => {
    return {
        type: REGISTER,
        data: {username, name, phone, email, password, res}
    };
};

export const registerRequest = (username, name, phone, email, password) => {
    return dispatch => {
        return OnclickRegister(username, name, phone, email, password).then(res => {
            dispatch(register(username, name, phone, email, password, res));
        });
    };
};
