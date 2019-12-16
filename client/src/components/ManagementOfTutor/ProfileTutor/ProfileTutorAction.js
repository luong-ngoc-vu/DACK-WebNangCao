import axios from 'axios';

export const UPDATE = 'UPDATE';

/* ==================== UPDATE USER INFORMATION ==================== */
function onClickUpdate(name, phone, email, image, moreInfo, address, addressCity,
                       levelStudy, curPosition, certificates, school, skills) {
    return axios.post('http://localhost:4000/user/update', {
        name,
        phone,
        email,
        image,
        moreInfo,
        address,
        addressCity,
        levelStudy,
        curPosition,
        certificates,
        school,
        skills
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

export const updateRequest = (name, phone, email, image, moreInfo, address, addressCity,
                              levelStudy, curPosition, certificates, school, skills) => {
    return (dispatch => {
        return onClickUpdate(name, phone, email, image, moreInfo, address, addressCity,
            levelStudy, curPosition, certificates, school, skills).then(res => {
            dispatch(update(res))
        })
    })
};
