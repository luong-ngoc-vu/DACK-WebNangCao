import {connect} from 'react-redux';
import * as actions from './ProfileTutorAction';
import ProfileTutor from './ProfileTutor';

const mapStateToProps = state => {
    const st = state.LoginReducer;
    return {
        email: st.email,
        name: st.name,
        phone: st.phone,
        token: st.token,
        isLogin: st.isLogin,
        isLoginFB: st.isLoginFB,
        isLoginGG: st.isLoginGG,
        image: st.image,
        address: st.address,
        addressCity: st.addressCity,
        moreInfo: st.moreInfo,
        typeUser: st.typeUser,
        skills: st.skills
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (name, phone, email, image, address, addressCity, moreInfo, skills) => {
            dispatch(actions.updateRequest(name, phone, email, image, address, addressCity, moreInfo, skills))
        },
    };
};

const ProfileTutorContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileTutor);

export default ProfileTutorContainer;
