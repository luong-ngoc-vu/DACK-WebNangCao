import {connect} from 'react-redux';
import * as actions from '../actions/action';
import ChangePass from '../components/ChangePassword';

const mapStateToProps = state => {
    return {
        username: state.UserReducer.username,
        password: state.UserReducer.password,
        token: state.UserReducer.token,
        isLogin: state.UserReducer.isLogin,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changePass: (username, password, newpassword) => {
            dispatch(actions.changePasswordRequest(username, password, newpassword))
        },
    };
};
const ChangePassContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePass);

export default ChangePassContainer;
