import axios from "axios";

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const LOGOUT = 'LOGOUT';
export const PLAY = 'PLAY';
export const BACK = 'BACK';
export const OPEN_MENU = 'OPEN_MENU';
export const CLOSE_MENU = 'CLOSE_MENU';
export const GET_USER = 'GET_USER';
export const UPDATE = 'UPDATE';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

/* =================== LOG IN =================== */
function OnClickLogin(username, password) {
    return axios.post('http://localhost:4000/user/login', {
        username,
        password
    }).catch(error => {
        return error;
    });
}

export const login = (username, password, res) => ({
    type: LOGIN,
    data: {
        username,
        password,
        res
    }
});

export const loginRequest = (username, password) => {
    return dispatch => {
        return OnClickLogin(username, password).then(res => {
            dispatch(login(username, password, res));
        })
    }
};

/* =================== REGISTER =================== */
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

/* =================== LOG OUT =================== */
export const LogOut = () => {
    return {
        type: LOGOUT
    };
};

/* =================== GET USER =================== */
function onClickGetUser(token) {
    return axios.get('http://localhost:4000/me', {
        headers: {Authorization: `Bearer ${token}`}
    }).catch(err => {
        return err
    });
}

export const getUser = (token, res) => {
    return {
        type: GET_USER,
        data: {
            token, res
        }
    }
};


export const getUserRequest = (token) => {
    return (dispatch => {
        return onClickGetUser(token).then(res => {
            dispatch(getUser(token, res));
        })
    })
};

/* =================== UPDATE USER INFORMATION =================== */
function onClickUpdate(username, name, phone, email) {
    return axios.post('https://localhost:4000/user/update', {
        username, name, phone, email
    }).catch(err => {
        return err
    })
}

export const update = (username, name, phone, email, res) => {
    return {
        type: UPDATE,
        data: {
            username, name, phone, email, res
        }
    }
};
export const updateRequest = (username, name, phone, email) => {

    return (dispatch => {
        return onClickUpdate(username, name, phone, email).then(res => {
            dispatch(update(username, name, phone, email, res))
        })
    })
};

/* =================== CHANGE PASSWORD =================== */
function onClickChangePassword(username, password, newpassword) {
    return axios.post('http://localhost:4000/user/changePassword', {
        username, password, newpassword
    }).catch(err => {
        return err
    })
}

export const changePassword = (username, password, newpassword, res) => {
    return {
        type: CHANGE_PASSWORD,
        data: {
            username, password, newpassword, res
        }
    }
};

export const changePasswordRequest = (username, password, newpassword) => {
    return (dispatch => {
        return onClickChangePassword(username, password, newpassword).then(res => {
            dispatch(changePassword(username, password, newpassword, res))
        })
    })
};
