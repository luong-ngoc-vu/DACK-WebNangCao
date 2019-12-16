import {connect} from 'react-redux';
import InteractForm from './InteractForm';

const mapStateToProps = (st) => {
    return {
        name: st.ViewDetailTutorReducer.name,
        phone: st.ViewDetailTutorReducer.phone,
        address: st.ViewDetailTutorReducer.address,
        addressCity: st.ViewDetailTutorReducer.addressCity,
        skills: st.ViewDetailTutorReducer.skills,

        isLogin: st.LoginReducer.isLogin,
        nameStudent: st.LoginReducer.name,
        typeUser: st.LoginReducer.typeUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const InteractFormContainer = connect(mapStateToProps, mapDispatchToProps)(InteractForm);

export default InteractFormContainer;
