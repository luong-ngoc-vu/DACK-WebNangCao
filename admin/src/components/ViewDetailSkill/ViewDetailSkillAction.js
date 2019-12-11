import axios from 'axios';

export const UPDATE_SKILL = 'UPDATE_SKILL';

function onClickUpdateSkill(_id, name) {
    return axios.post('https://apiadminwebsitethuegiasu.herokuapp.com/admin/updateSkill', {
        _id, name
    }).catch(err => {
        return err
    })
}

export const updateSkill = (res) => {
    return {
        type: UPDATE_SKILL,
        data: {res}
    }
};

export const updateSkillRequest = (_id, name) => {
    return (dispatch => {
        return onClickUpdateSkill(_id, name).then(res => {
            dispatch(updateSkill(res))
        })
    })
};
