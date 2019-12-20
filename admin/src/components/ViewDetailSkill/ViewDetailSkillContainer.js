import {connect} from 'react-redux';
import ViewDetailSkill from './ViewDetailSkill';
import {updateSkillRequest} from './ViewDetailSkillAction'

const mapStateToProps = (st) => {
    return {
        name: st.Skill.name,
        _id: st.Skill._id,
        checkUpdateSkill: st.Skill.checkUpdateSkill,

        isLogin: st.LoginReducer.isLogin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateSkill: (_id, name) => {
            dispatch(updateSkillRequest(_id, name))
        },
    };
};

const ViewDetailSkillContainer = connect(mapStateToProps, mapDispatchToProps)(ViewDetailSkill);

export default ViewDetailSkillContainer;
