import { connect } from 'react-redux';
import { viewDetailTutorRequest } from "../Home/OutstandingTutorList/OutstandingTutorListAction";
import ListTutor from "./ListTutor";


const mapStateToProps = (st) => {
    return {
        email: st.LoginReducer.email,
        token: st.LoginReducer.token,
        isLogin: st.LoginReducer.isLogin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        viewDetailTutor: (id) => {
            dispatch(viewDetailTutorRequest(id));
        },
    };
};

export const ListTutorContainer = connect(mapStateToProps, mapDispatchToProps)(ListTutor);
