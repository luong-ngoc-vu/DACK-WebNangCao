import {connect} from 'react-redux';
import ViewDetailUser from './ViewDetaiUser';

const mapStateToProps = (st) => {
    return {
        email: st.ViewDetailUserReducer.email,
        name: st.ViewDetailUserReducer.name,
        phone: st.ViewDetailUserReducer.phone,
        address: st.ViewDetailUserReducer.address,
        isLogin: st.LoginReducer.isLogin,

        provinceName: st.ViewDetailUserReducer.provinceName,
        districtName: st.ViewDetailUserReducer.districtName,
        wardName: st.ViewDetailUserReducer.wardName,

        moreInfo: st.ViewDetailUserReducer.moreInfo,
        typeUser: st.ViewDetailUserReducer.typeUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const ViewDetailUserContainer = connect(mapStateToProps, mapDispatchToProps)(ViewDetailUser);

export default ViewDetailUserContainer;
