import axios from 'axios';

export const UPDATE = 'UPDATE';

function onClickUpdate(name, phone, email, image, gender, address, provinceName, districtName, wardName, moreInfo) {
    return axios.post('https://apiclientwebsitethuegiasu.herokuapp.com/user/update', {
        name, phone, email, image, gender, address, provinceName, districtName, wardName, moreInfo
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

export const updateRequest = (name, phone, email, image, gender, address,
                              provinceName, districtName, wardName, moreInfo) => {
    return (dispatch => {
        return onClickUpdate(name, phone, email, image, gender, address,
            provinceName, districtName, wardName, moreInfo).then(res => {
            dispatch(update(res))
        })
    })
};
