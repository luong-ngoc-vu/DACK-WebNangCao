import axios from "axios";

export const REGISTER = 'REGISTER';

/* ========================= REGISTER ========================= */
function OnclickRegister(name, phone, email, password, typeUser) {
    return axios.post('http://localhost:4000/user/register', {
        name, phone, email, password, typeUser
    }).catch(error => {
        return error;
    });
}

export const register = (name, phone, password, email, typeUser, res) => {
    return {
        type: REGISTER,
        data: {name, phone, email, password, typeUser, res}
    };
};

export const registerRequest = (name, phone, email, password, typeUser) => {
    return dispatch => {
        return OnclickRegister(name, phone, email, password, typeUser).then(res => {
            dispatch(register(name, phone, email, password, typeUser, res));
        });
    };
};
