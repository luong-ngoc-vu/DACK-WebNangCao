import {connect} from 'react-redux';
import ManagementHire from './ManagementTutor';

const mapStateToProps = state => {
    const st = state.LoginReducer;
    return {
        isLogin: st.isLogin,
        typeUser: st.typeUser
    };
};

const ManagementHireContainer = connect(mapStateToProps)(ManagementHire);

export default ManagementHireContainer;
