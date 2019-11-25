import {connect} from 'react-redux';
import * as actions from '../actions/action';
import Login from '../components/Login';

const mapstToProps = state => {
    return {
        username: state.UserReducer.username,
        password: state.UserReducer.password,
        isLogin: state.UserReducer.isLogin,
        token: state.UserReducer.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        Login: (username, password) => {
            dispatch(actions.loginRequest(username, password));
        },
    };
};
const LoginContainer = connect(
    mapstToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer;
