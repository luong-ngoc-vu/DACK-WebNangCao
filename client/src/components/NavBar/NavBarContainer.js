import {connect} from 'react-redux';
import * as action from './NavBarAction';
import NavBar from './NavBar';

const mapStateToProps = (st) => {
    return {
        name: st.LoginReducer.name,
        email: st.LoginReducer.email,
        token: st.LoginReducer.token,
        image: st.LoginReducer.image,
        isLogin: st.LoginReducer.isLogin,
        isLoginFB: st.LoginReducer.isLoginFB,
        isLoginGG: st.LoginReducer.isLoginGG,
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

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default NavBarContainer;
