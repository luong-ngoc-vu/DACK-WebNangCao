export const LOGOUT = 'LOGOUT';
export const VIEW_BY_LIST_TUTORIAL = 'VIEW_BY_LIST_TUTORIAL';

/* =================== LOG OUT =================== */
export const LogOut = () => {
    return {
        type: LOGOUT
    };
};

export const ViewByList = (skillName) => {
    return {
        type: VIEW_BY_LIST_TUTORIAL, skillName
    };
};

export const ViewByListRequest = (skillName) => {
    return dispatch => {
        return dispatch(ViewByList(skillName));
    };
};
