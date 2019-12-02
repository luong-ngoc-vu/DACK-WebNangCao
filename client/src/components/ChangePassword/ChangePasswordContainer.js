import {connect} from 'react-redux';
import * as actions from './ChangePasswordAction';
import ChangePassword from './ChangePassword';

const mapStateToProps = state => {
    return {
        email: state.LoginReducer.email,
        password: state.LoginReducer.password,
        token: state.LoginReducer.token,
        image: state.LoginReducer.image,
        isLogin: state.LoginReducer.isLogin,
        isRightPassword: state.LoginReducer.isRightPassword
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changePass: (email, password, newpassword) => {
            dispatch(actions.changePasswordRequest(email, password, newpassword))
        },
    };
};
const ChangePasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

export default ChangePasswordContainer;
