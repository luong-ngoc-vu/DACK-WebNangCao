import { connect } from 'react-redux';
import { Login } from './Login';
import {loginRequest} from './LoginAction';

const mapStateToProps = state => {
    return {
        email: state.LoginReducer.userName,
        password: state.LoginReducer.password,
        typeUser: state.LoginReducer.role,
        isLogin: state.LoginReducer.isLogin,
        token: state.LoginReducer.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        Login: (email, password) => {
            dispatch(loginRequest(email, password));
        },
    };
};
const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
