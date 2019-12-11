import {connect} from 'react-redux';
import {createSkillRequest} from './CreateSkillAction';
import CreateSkill from './CreateSkill';

const mapStateToProps = state => {
    const st = state.Skill;
    return {
        isCreateSkill: st.isCreateSkill,
        checkCreateSkill: st.checkCreateSkill,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        CreateSkill: (name) => {
            dispatch(createSkillRequest(name));
        }
    };
};
const CreateSkillContainer = connect(mapStateToProps, mapDispatchToProps)(CreateSkill);

export default CreateSkillContainer;
