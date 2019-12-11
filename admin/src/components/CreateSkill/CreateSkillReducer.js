export const initialState = {
    isCreateSkill: '',
    checkCreateSkill: false,
    checkUpdateSkill: false,
    name: '',
    _id: ''
};

const Skill = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_SKILL": {
            const st = {...state};
            if (action.data.res.message === "Request failed with status code 400") {
                st.checkCreateSkill = false;
                st.isCreateSkill = 'err';
                return st;
            } else {
                st.isCreateSkill = 'success';
                st.checkCreateSkill = true;
            }
            return st;
        }

        case "VIEW_DETAIL_SKILL": {
            const st = {...state};
            st.name = action.data.res.data[0].name;
            st._id = action.data.res.data[0]._id;
            return st;
        }

        case 'UPDATE_SKILL': {
            const st = {...state};
            st.name = action.data.res.data.name;
            st.checkUpdateSkill = true;
            return st;
        }

        case 'DELETE_SKILL': {
            return initialState;
        }

        default:
            return initialState;
    }
};

export default Skill;
