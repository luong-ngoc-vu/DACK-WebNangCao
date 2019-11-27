import axios from 'axios';

export const UPDATE = 'UPDATE';

/* ==================== UPDATE USER INFORMATION ==================== */
function onClickUpdate(username, name, phone, email, image) {
    return axios.post('http://localhost:4000/user/update', {
        username, name, phone, email, image
    }).catch(err => {
        return err
    })
}

export const update = (username, name, phone, email, image, res) => {
    return {
        type: UPDATE,
        data: {
            username, name, phone, email, image, res
        }
    }
};

export const updateRequest = (username, name, phone, email, image) => {
    return (dispatch => {
        return onClickUpdate(username, name, phone, email, image).then(res => {
            dispatch(update(username, name, phone, email, image, res))
        })
    })
};
