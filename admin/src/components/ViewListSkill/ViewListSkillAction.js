import axios from "axios";

export const VIEW_DETAIL_SKILL = 'VIEW_DETAIL_SKILL';
export const DELETE_SKILL = 'DELETE_SKILL';

function OnClickViewDetailSkill(_id) {
    return axios.post('http://localhost:4000/admin/skill', {
        _id
    }).catch(error => {
        return error;
    });
}

export const viewDetailSkill = (res) => ({
    type: VIEW_DETAIL_SKILL,
    data: {res}
});

export const viewDetailSkillRequest = (_id) => {
    return dispatch => {
        return OnClickViewDetailSkill(_id).then(res => {
            dispatch(viewDetailSkill(res));
        })
    }
};

///////
function onClickDeleteSkill(_id) {
    return axios.post('http://localhost:4000/admin/deleteSkill', {
        _id
    }).catch(err => {
        return err
    })
}

export const deleteSkill = (res) => {
    return {
        type: DELETE_SKILL,
        data: {res}
    }
};

export const deleteSkillRequest = (_id) => {
    return (dispatch => {
        return onClickDeleteSkill(_id).then(res => {
            dispatch(deleteSkill(res))
        })
    })
};


