import {connect} from 'react-redux';
import DetailTutor from './DetailTutor';

const mapStateToProps = (st) => {
    return {
        email: st.ViewDetailTutorReducer.email,
        name: st.ViewDetailTutorReducer.name,
        phone: st.ViewDetailTutorReducer.phone,
        address: st.ViewDetailTutorReducer.address,
        addressCity: st.ViewDetailTutorReducer.addressCity,
        moreInfo: st.ViewDetailTutorReducer.moreInfo,
        typeUser: st.ViewDetailTutorReducer.typeUser,
        image: st.ViewDetailTutorReducer.image,
        skills: st.ViewDetailTutorReducer.skills,
        curPosition: st.ViewDetailTutorReducer.curPosition,
        levelStudy: st.ViewDetailTutorReducer.levelStudy,
        certificates: st.ViewDetailTutorReducer.certificates,

        isLogin: st.LoginReducer.isLogin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const DetailTutorContainer = connect(mapStateToProps, mapDispatchToProps)(DetailTutor);

export default DetailTutorContainer;
