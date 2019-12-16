import axios from "axios";

export const VIEW_DETAIL_TUTOR = 'VIEW_DETAIL_TUTOR';

function OnClickViewDetailTutor(id) {
    return axios.get(`http://localhost:4000/user/detailTutor/${id}`)
        .catch(error => {
            return error;
        });
}

export const viewDetailTutor = (res) => ({
    type: VIEW_DETAIL_TUTOR,
    data: {res}
});

export const viewDetailTutorRequest = (id) => {
    return dispatch => {
        return OnClickViewDetailTutor(id).then(res => {
            dispatch(viewDetailTutor(res));
        })
    }
};

