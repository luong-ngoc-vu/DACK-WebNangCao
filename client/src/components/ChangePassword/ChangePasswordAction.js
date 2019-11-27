import axios from 'axios';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

/* ====================== CHANGE PASSWORD ====================== */
function onClickChangePassword(username, password, newpassword) {
    return axios.post('http://localhost:4000/user/changePass', {
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
