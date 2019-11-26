import {connect} from 'react-redux';
import * as actions from '../actions/action';
import InforUser from '../components/UpdateUserInfor';

const mapStateToProps = state => {
    const st = state.UserReducer;
    return {
        username: st.username,
        name: st.name,
        phone: st.phone,
        email: st.email,
        token: st.token,
        isLogin: st.isLogin,
        image: st.image
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (username, name, phone, email, image) => {
            dispatch(actions.updateRequest(username, name, phone, email, image))
        },
    };
};

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(InforUser);

export default UserContainer;
