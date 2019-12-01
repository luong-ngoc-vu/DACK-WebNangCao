import axios from 'axios';

export const GET_USER = 'GET_USER';
export const LOGOUT = 'LOGOUT';

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
