import {connect} from 'react-redux';
import * as action from '../actions/action';
import HomePage from '../components/HomePage';


const mapStateToProps = (st) => {
    return {
        name: st.UserReducer.name,
        email: st.UserReducer.email,
        token: st.UserReducer.token,
        isLogin: st.UserReducer.isLogin,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => {
            dispatch(action.LogOut())
        },
        getUser: (token) => {
            dispatch(action.getUserRequest(token))
        },

    }
};


const HomePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

export default HomePageContainer;
