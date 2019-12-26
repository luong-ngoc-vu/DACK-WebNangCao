import axios from 'axios';

export const UPDATE = 'UPDATE';

/* ==================== UPDATE USER INFORMATION ==================== */
function onClickUpdate(name, phone, email, image, gender, moreInfo, address, provinceName, districtName, wardName,
                       levelStudy, curPosition, certificates, school, money, teacherTimeDay, skills) {
    return axios.post('https://apiclientwebsitethuegiasu.herokuapp.com/user/update', {
        name,
        phone,
        email,
        image,
        gender,
        moreInfo,
        address,
        provinceName,
        districtName,
        wardName,
        levelStudy,
        curPosition,
        certificates,
        school,
        money,
        teacherTimeDay,
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

export const updateRequest = (name, phone, email, image, gender, moreInfo, address, provinceName, districtName, wardName,
                              levelStudy, curPosition, certificates, school, money, teacherTimeDay, skills) => {
    return (dispatch => {
        return onClickUpdate(name, phone, email, image, gender, moreInfo, address, provinceName, districtName, wardName,
            levelStudy, curPosition, certificates, school, money, teacherTimeDay, skills).then(res => {
            dispatch(update(res))
        })
    })
};
