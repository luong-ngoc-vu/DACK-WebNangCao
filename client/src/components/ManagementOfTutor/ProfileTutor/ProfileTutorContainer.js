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
        provinceName: st.provinceName,
        districtName: st.districtName,
        wardName: st.wardName,
        moreInfo: st.moreInfo,
        typeUser: st.typeUser,
        skills: st.skills,
        levelStudy: st.levelStudy,
        curPosition: st.curPosition,
        certificates: st.certificates,
        school: st.school,
        money: st.money,
        teacherTimeDay: st.teacherTimeDay,
        gender: st.gender,
        idUser: st.idUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (name, phone, email, image,gender, moreInfo, address, provinceName, districtName, wardName,
                     levelStudy, curPosition, certificates, school, money, teacherTimeDay, skills) => {
            dispatch(actions.updateRequest(name, phone, email, image,gender, moreInfo, address, provinceName, districtName, wardName,
                levelStudy, curPosition, certificates, school, money, teacherTimeDay, skills))
        },
    };
};

const ProfileTutorContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileTutor);

export default ProfileTutorContainer;
