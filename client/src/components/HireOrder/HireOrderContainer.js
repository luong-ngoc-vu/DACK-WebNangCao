import {connect} from 'react-redux';
import HireOrder from './HireOrder';

const mapStateToProps = (st) => {
    return {
        name: st.ViewDetailTutorReducer.name,
        phone: st.ViewDetailTutorReducer.phone,
        address: st.ViewDetailTutorReducer.address,
        addressCity: st.ViewDetailTutorReducer.addressCity,
        skills: st.ViewDetailTutorReducer.skills,
        money: st.ViewDetailTutorReducer.money,

        curMoney: st.LoginReducer.curMoney,
        isLogin: st.LoginReducer.isLogin,
        nameStudent: st.LoginReducer.name,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const HireOrderContainer = connect(mapStateToProps, mapDispatchToProps)(HireOrder);

export default HireOrderContainer;
