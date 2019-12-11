import axios from "axios";

export const VIEW_DETAIL_USER = 'VIEW_DETAIL_USER';

/* ========================= LOG IN ========================= */
function OnClickViewDetail(_id) {
    return axios.post('https://apiadminwebsitethuegiasu.herokuapp.com/admin/user', {
        _id
    }).catch(error => {
        return error;
    });
}

export const viewDetail = (res) => ({
    type: VIEW_DETAIL_USER,
    data: {res}
});

export const viewDetailRequest = (_id) => {
    return dispatch => {
        return OnClickViewDetail(_id).then(res => {
            dispatch(viewDetail(res));
        })
    }
};

