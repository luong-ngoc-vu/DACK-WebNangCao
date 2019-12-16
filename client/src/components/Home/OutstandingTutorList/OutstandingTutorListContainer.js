import {connect} from 'react-redux';
import {viewDetailTutorRequest} from "./OutstandingTutorListAction";
import OutstandingTutorList from "./OutstandingTutorList";

const mapStateToProps = (st) => {
    return {
        email: st.LoginReducer.email,
        token: st.LoginReducer.token,
        isLogin: st.LoginReducer.isLogin
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        viewDetailTutor: (id) => {
            dispatch(viewDetailTutorRequest(id));
        },
    };
};

const ViewListOutStandingContainer = connect(mapStateToProps, mapDispatchToProps)(OutstandingTutorList);

export default ViewListOutStandingContainer;
