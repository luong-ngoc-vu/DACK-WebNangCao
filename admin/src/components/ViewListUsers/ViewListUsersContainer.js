import {connect} from 'react-redux';
import ViewListUsers from './ViewListUsers';
import {viewDetailRequest} from "./ViewListUserAction";

const mapStateToProps = (st) => {
    return {
        email: st.LoginReducer.email,
        token: st.LoginReducer.token,
        isLogin: st.LoginReducer.isLogin
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        viewDetailUser: (_id) => {
            dispatch(viewDetailRequest(_id));
        },
    };
};

const ViewListUsersContainer = connect(mapStateToProps, mapDispatchToProps)(ViewListUsers);

export default ViewListUsersContainer;
