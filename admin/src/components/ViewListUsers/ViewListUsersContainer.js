import {connect} from 'react-redux';
import ViewListUsers from './ViewListUsers';
import {viewDetailRequest, lockUserRequest} from "./ViewListUserAction";

const mapStateToProps = (st) => {
    return {
        email: st.LoginReducer.email,
        token: st.LoginReducer.token,
        isLogin: st.LoginReducer.isLogin,

        isLocked: st.ViewDetailUserReducer.isLocked
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        viewDetailUser: (_id) => {
            dispatch(viewDetailRequest(_id));
        },
        lockUser: (email) => {
            dispatch(lockUserRequest(email));
        },
    };
};

const ViewListUsersContainer = connect(mapStateToProps, mapDispatchToProps)(ViewListUsers);

export default ViewListUsersContainer;
