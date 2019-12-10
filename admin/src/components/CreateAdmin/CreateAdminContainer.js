import {connect} from 'react-redux';
import * as actions from './CreateAdminAction';
import CreateAdmin from './CreateAdmin';

const mapStateToProps = state => {
    const st = state.CreateAdminReducer;
    return {
        isCreateAdmin: st.isCreateAdmin,
        checkCreateAdmin: st.checkCreateAdmin,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        CreateAdmin: (email, password) => {
            dispatch(actions.createAdminRequest(email, password));
        }
    };
};
const CreateAdminContainer = connect(mapStateToProps, mapDispatchToProps)(CreateAdmin);

export default CreateAdminContainer;
