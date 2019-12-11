import axios from 'axios';

export const UPDATE = 'UPDATE';

/* ==================== UPDATE USER INFORMATION ==================== */
function onClickUpdate(name, phone, email, image, address, addressCity, moreInfo, skills) {
    return axios.post('http://localhost:4000/user/update', {
        name, phone, email, image, address, addressCity, moreInfo, skills
    }).catch(err => {
        return err
    })
}

export const update = (name, phone, email, image, address, addressCity, moreInfo, skills, res) => {
    return {
        type: UPDATE,
        data: {name, phone, email, image, address, addressCity, moreInfo, skills, res}
    }
};

export const updateRequest = (name, phone, email, image, address, addressCity, moreInfo, skills) => {
    return (dispatch => {
        return onClickUpdate(name, phone, email, image, address, addressCity, moreInfo, skills).then(res => {
            dispatch(update(name, phone, email, image, address, addressCity, moreInfo, skills, res))
        })
    })
};
