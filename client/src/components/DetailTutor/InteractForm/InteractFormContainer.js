import {connect} from 'react-redux';
import InteractForm from './InteractForm';

const mapStateToProps = (st) => {
    return {
        isLogin: st.LoginReducer.isLogin,
        typeUser: st.LoginReducer.typeUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const InteractFormContainer = connect(mapStateToProps, mapDispatchToProps)(InteractForm);

export default InteractFormContainer;
