import axios from 'axios';

export const UPDATE = 'UPDATE';

function onClickUpdate(name, phone, email, image, address, provinceName, districtName, wardName, moreInfo, curMoney) {
    return axios.post('http://localhost:4000/user/update', {
        name, phone, email, image, address, provinceName, districtName, wardName, moreInfo, curMoney
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

export const updateRequest = (name, phone, email, image, address,
                              provinceName, districtName, wardName, moreInfo, curMoney) => {
    return (dispatch => {
        return onClickUpdate(name, phone, email, image, address,
            provinceName, districtName, wardName, moreInfo, curMoney).then(res => {
            dispatch(update(res))
        })
    })
};
