import {connect} from 'react-redux';
import * as actions from './LoginAction';
import {Login} from './Login';

const mapStateToProps = state => {
    return {
        email: state.LoginReducer.email,
        password: state.LoginReducer.password,
        typeUser: state.LoginReducer.typeUser,
        isLogin: state.LoginReducer.isLogin,
        isLocked: state.LoginReducer.isLocked,
        isLoginFB: state.LoginReducer.isLoginFB,
        isLoginGG: state.LoginReducer.isLoginGG,
        token: state.LoginReducer.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        Login: (email, password) => {
            dispatch(actions.loginRequest(email, password));
        },
        LoginFB: (res, typeUser) => {
            dispatch(actions.loginFB(res, typeUser))
        },
        LoginGG: (res, typeUser) => {
            dispatch(actions.loginGG(res, typeUser))
        }
    };
};
const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
