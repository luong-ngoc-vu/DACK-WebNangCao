import {connect} from 'react-redux';
import ViewListSkill from './ViewListSkill';
import {deleteSkillRequest, viewDetailSkillRequest} from './ViewListSkillAction'

const mapStateToProps = (st) => {
    return {
        email: st.LoginReducer.email,
        token: st.LoginReducer.token,
        isLogin: st.LoginReducer.isLogin
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        viewDetailSkill: (_id) => {
            dispatch(viewDetailSkillRequest(_id));
        },
        deleteSkill: (_id) => {
            dispatch(deleteSkillRequest(_id));
        }
    };
};

const ViewListSkillContainer = connect(mapStateToProps, mapDispatchToProps)(ViewListSkill);

export default ViewListSkillContainer;
