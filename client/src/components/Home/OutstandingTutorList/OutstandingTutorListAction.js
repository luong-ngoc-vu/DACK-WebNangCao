import axios from "axios";

export const VIEW_DETAIL_TUTOR = 'VIEW_DETAIL_TUTOR';

function OnClickViewDetailTutor(email) {
    return axios.post('https://apiclientwebsitethuegiasu.herokuapp.com/user/detailTutor', {
        email
    }).catch(error => {
        return error;
    });
}

export const viewDetailTutor = (res) => ({
    type: VIEW_DETAIL_TUTOR,
    data: {res}
});

export const viewDetailTutorRequest = (email) => {
    return dispatch => {
        return OnClickViewDetailTutor(email).then(res => {
            dispatch(viewDetailTutor(res));
        })
    }
};

