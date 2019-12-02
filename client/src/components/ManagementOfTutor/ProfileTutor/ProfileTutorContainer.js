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
        image: st.image,
        address: st.address,
        moreInfo: st.moreInfo,
        typeUser: st.typeUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (name, phone, email, image, address, moreInfo) => {
            dispatch(actions.updateRequest(name, phone, email, image, address, moreInfo))
        },
    };
};

const ProfileTutorContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileTutor);

export default ProfileTutorContainer;
