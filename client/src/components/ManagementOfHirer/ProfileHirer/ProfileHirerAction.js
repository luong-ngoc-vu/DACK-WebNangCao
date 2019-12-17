import axios from 'axios';

export const UPDATE = 'UPDATE';

/* ==================== UPDATE USER INFORMATION ==================== */
function onClickUpdate(name, phone, email, image, address, addressCity, moreInfo) {
    return axios.post('http://localhost:4000/user/update', {
        name, phone, email, image, address, addressCity, moreInfo
    }).catch(err => {
        return err
    })
}

export const update = (res) => {
    return {
        type: UPDATE,
        data: {res}
    }
};

export const updateRequest = (name, phone, email, image, address, addressCity, moreInfo) => {
    return (dispatch => {
        return onClickUpdate(name, phone, email, image, address, addressCity, moreInfo).then(res => {
            dispatch(update(res))
        })
    })
};
