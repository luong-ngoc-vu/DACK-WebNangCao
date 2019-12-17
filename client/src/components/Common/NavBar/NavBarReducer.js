export const initialState = {
    skillName: '',
};

const NavBarReducer = (state = initialState, action) => {
    switch (action.type) {
        case "VIEW_BY_LIST_TUTORIAL": {
            const st = {...state};
            st.skillName = action.skillName;
            return st;
        }
        default:
            return initialState;
    }
};

export default NavBarReducer;
