import {connect} from 'react-redux';
import * as actions from './ProfileHirerAction';
import ProfileHirer from './ProfileHirer';

const mapStateToProps = state => {
    const st = state.LoginReducer;
    return {
        email: st.email,
        name: st.name,
        phone: st.phone,
        token: st.token,
        isLogin: st.isLogin,
        image: st.image,
        address: st.address,
        addressCity: st.addressCity,
        moreInfo: st.moreInfo,
        isLoginFB: st.isLoginFB,
        isLoginGG: st.isLoginGG,
        typeUser: st.typeUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (name, phone, email, image, address, addressCity, moreInfo) => {
            dispatch(actions.updateRequest(name, phone, email, image, address, addressCity, moreInfo))
        },
    };
};

const ProfileHirerContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileHirer);

export default ProfileHirerContainer;
