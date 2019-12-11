import axios from 'axios';

export const CREATE_SKILL = 'CREATE_SKILL';

function onClickCreateSkill(name) {
    return axios.post('http://localhost:4000/admin/createSkill', {
        name
    }).catch(err => {
        return err;
    });
}

export const createSkill = (res) => {
    return {
        type: CREATE_SKILL,
        data: {res}
    };
};

export const createSkillRequest = (name) => {
    return (dispatch => {
        return onClickCreateSkill(name).then(res => {
            dispatch(createSkill(res));
        });
    });
};
