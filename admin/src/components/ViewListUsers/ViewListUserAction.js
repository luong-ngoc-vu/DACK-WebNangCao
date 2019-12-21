import axios from "axios";

export const VIEW_DETAIL_USER = 'VIEW_DETAIL_USER';
export const LOCK_USER = 'LOCK_USER';
export const VIEW_CONTRACT = 'VIEW_CONTRACT';

function OnClickViewDetail(_id) {
    return axios.post('http://localhost:4000/admin/user', {
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

export const viewContract = (idContract, idStudent, idTeacher) => ({
    type: VIEW_CONTRACT,
    data: {idContract, idStudent, idTeacher}
});

export const viewContractRequest = (idContract, idStudent, idTeacher) => {
    return dispatch => {
        dispatch(viewContract(idContract, idStudent, idTeacher));
    }
};

function OnClickLockUser(email) {
    return axios.post('http://localhost:4000/admin/lockAccount', {
        email
    }).catch(error => {
        return error;
    });
}

export const lockUser = (res) => ({
    type: LOCK_USER,
    data: {res}
});

export const lockUserRequest = (email) => {
    return dispatch => {
        return OnClickLockUser(email).then(res => {
            dispatch(lockUser(res));
        })
    }
};

