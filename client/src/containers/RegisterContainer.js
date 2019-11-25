import {connect} from 'react-redux';
import * as actions from '../actions/action';
import Register from '../components/Register';

const mapStateToProps = state => {
    const st = state.RegisterReducer;
    return {
        isRegister: st.isRegister,
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
