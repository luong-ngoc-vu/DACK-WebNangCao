import { connect } from 'react-redux';
import * as actions from './LoginAction';
import { Login } from './Login';

const mapstToProps = state => {
    return {
        username: state.LoginReducer.username,
        password: state.LoginReducer.password,
        isLogin: state.LoginReducer.isLogin,
        token: state.LoginReducer.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        Login: (username, password) => {
            dispatch(actions.loginRequest(username, password));
        },
        LoginFB: (res) => {
            dispatch(actions.loginFB(res))
        },
        LoginGG: (res) => {
            dispatch(actions.loginGG(res))
        }
    };
};
const LoginContainer = connect(mapstToProps, mapDispatchToProps)(Login);

export default LoginContainer;
