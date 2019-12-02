import axios from 'axios';

export const UPDATE = 'UPDATE';

/* ==================== UPDATE USER INFORMATION ==================== */
function onClickUpdate(name, phone, email, image, address, moreInfo) {
    return axios.post('http://localhost:4000/user/update', {
        name, phone, email, image, address, moreInfo
    }).catch(err => {
        return err
    })
}

export const update = (name, phone, email, image, address, moreInfo, res) => {
    return {
        type: UPDATE,
        data: {name, phone, email, image, address, moreInfo, res}
    }
};

export const updateRequest = (name, phone, email, image, address, moreInfo) => {
    return (dispatch => {
        return onClickUpdate(name, phone, email, image, address, moreInfo).then(res => {
            dispatch(update(name, phone, email, image, address, moreInfo, res))
        })
    })
};
