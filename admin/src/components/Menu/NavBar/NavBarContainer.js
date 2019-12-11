import { connect } from 'react-redux';
import * as action from './NavBarAction';
import NavBar from './NavBar';

const mapStateToProps = (st) => {
    return {
        email: st.LoginReducer.email,
        token: st.LoginReducer.token,
        isLogin: st.LoginReducer.isLogin
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => {
            dispatch(action.LogOut());
        }
    };
};

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default NavBarContainer;
