import axios from 'axios';

export const CREATE_ADMIN = 'CREATE_ADMIN';

/* ====================== CHANGE PASSWORD ====================== */
function onClickCreateAdmin(email, password) {
    return axios.post('https://apiadminwebsitethuegiasu.herokuapp.com/rootAdmin/createAdmin', {
        email, password
    }).catch(err => {
        return err;
    });
}

export const createAdmin = (email, password, res) => {
    return {
        type: CREATE_ADMIN,
        data: {
            email, password, res
        }
    };
};

export const createAdminRequest = (email, password) => {
    return (dispatch => {
        return onClickCreateAdmin(email, password).then(res => {
            dispatch(createAdmin(email, password, res));
        });
    });
};
