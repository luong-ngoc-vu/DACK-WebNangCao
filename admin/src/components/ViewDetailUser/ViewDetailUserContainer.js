import {connect} from 'react-redux';
import ViewDetailUser from './ViewDetaiUser';

const mapStateToProps = (st) => {
    return {
        email: st.ViewListUserReducer.email,
        name: st.ViewListUserReducer.name,
        phone: st.ViewListUserReducer.phone,
        address: st.ViewListUserReducer.address,
        addressCity: st.ViewListUserReducer.addressCity,
        moreInfo: st.ViewListUserReducer.moreInfo,
        typeUser: st.ViewListUserReducer.typeUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const ViewDetailUserContainer = connect(mapStateToProps, mapDispatchToProps)(ViewDetailUser);

export default ViewDetailUserContainer;
