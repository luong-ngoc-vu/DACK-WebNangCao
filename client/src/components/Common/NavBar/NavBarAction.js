export const LOGOUT = 'LOGOUT';
export const VIEW_BY_LIST_TUTORIAL = 'VIEW_BY_LIST_TUTORIAL';

/* =================== LOG OUT =================== */
export const LogOut = () => {
    return {
        type: LOGOUT
    };
};

export const ViewByList = (subSkillName) => {
    return {
        type: VIEW_BY_LIST_TUTORIAL, subSkillName
    };
};

export const ViewByListRequest = (subSkillName) => {
    return dispatch => {
        return dispatch(ViewByList(subSkillName));
    };
};
