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
        moreInfo: st.moreInfo,
        provinceName: st.provinceName,
        districtName: st.districtName,
        wardName: st.wardName,
        address: st.address,
        isLoginFB: st.isLoginFB,
        isLoginGG: st.isLoginGG,
        typeUser: st.typeUser,
        curMoney: st.curMoney,
        gender: st.gender,
        idUser: st.idUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (name, phone, email, image, gender, address, provinceName, districtName, wardName, moreInfo) => {
            dispatch(actions.updateRequest(name, phone, email, image, gender, address,
                provinceName, districtName, wardName, moreInfo))
        },
    };
};

const ProfileHirerContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileHirer);

export default ProfileHirerContainer;
