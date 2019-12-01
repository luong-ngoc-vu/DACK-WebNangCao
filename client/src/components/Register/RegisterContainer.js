import {connect} from 'react-redux';
import * as actions from './RegisterAction';
import {Register} from './Register';

const mapStateToProps = state => {
    const st = state.RegisterReducer;
    return {
        isRegister: st.isRegister,
        checkRegister: st.checkRegister,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        Register: (name, phone, email, password, typeUser) => {
            dispatch(actions.registerRequest(name, phone, email, password, typeUser));
        }
    };
};

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterContainer;
