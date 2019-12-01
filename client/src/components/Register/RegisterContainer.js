import { connect } from 'react-redux';
import * as actions from './RegisterAction';
import { Register } from '../Register/Register';

const mapStateToProps = state => {
    const st = state.RegisterReducer;
    return {
        isRegister: st.isRegister,
        checkRegister: st.checkRegister,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        Register: (username, name, phone, email, password) => {
            dispatch(actions.registerRequest(username, name, phone, email, password));
        }
    };
};

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterContainer;
