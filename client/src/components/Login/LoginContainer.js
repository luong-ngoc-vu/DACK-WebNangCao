import {connect} from 'react-redux';
import * as actions from './LoginAction';
import {Login} from './Login';

const mapstToProps = state => {
    return {
        username: state.LoginReducer.username,
        password: state.LoginReducer.password,
        typeUser: state.LoginReducer.typeUser,
        isLogin: state.LoginReducer.isLogin,
        isLoginFB: state.LoginReducer.isLoginFB,
        isLoginGG: state.LoginReducer.isLoginGG,
        token: state.LoginReducer.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        Login: (username, password) => {
            dispatch(actions.loginRequest(username, password));
        },
        LoginFB: (res, typeUser) => {
            dispatch(actions.loginFB(res, typeUser))
        },
        LoginGG: (res) => {
            dispatch(actions.loginGG(res, typeUser))
        }
    };
};
const LoginContainer = connect(mapstToProps, mapDispatchToProps)(Login);

export default LoginContainer;
