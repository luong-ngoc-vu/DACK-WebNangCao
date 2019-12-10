import {connect} from 'react-redux';
import {Login} from './Login';
import {loginRequest} from './LoginAction';

const mapStateToProps = state => {
    return {
        email: state.LoginReducer.email,
        password: state.LoginReducer.password,
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
