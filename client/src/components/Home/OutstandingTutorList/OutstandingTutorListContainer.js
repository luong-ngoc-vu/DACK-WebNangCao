import {connect} from 'react-redux';
import {viewDetailTutorRequest} from "./OutstandingTutorListAction";
import OutstandingTutorList from "./OutstandingTutorList";
import ListTutorialsBySkill from "./ListTutorialsBySkill";

const mapStateToProps = (st) => {
    return {
        email: st.LoginReducer.email,
        token: st.LoginReducer.token,
        isLogin: st.LoginReducer.isLogin,

        skillName: st.NavBarReducer.skillName
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        viewDetailTutor: (id) => {
            dispatch(viewDetailTutorRequest(id));
        },
    };
};

export const ViewListOutStandingContainer = connect(mapStateToProps, mapDispatchToProps)(OutstandingTutorList);
export const ListTutorialsBySkillContainer = connect(mapStateToProps, mapDispatchToProps)(ListTutorialsBySkill);

export default {ViewListOutStandingContainer, ListTutorialsBySkillContainer};
