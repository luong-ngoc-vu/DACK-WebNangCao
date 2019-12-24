import {connect} from 'react-redux';
import * as action from './NavBarAction';
import NavBar from './NavBar';

const mapStateToProps = (st) => {
    return {
        name: st.LoginReducer.name,
        email: st.LoginReducer.email,
        token: st.LoginReducer.token,
        image: st.LoginReducer.image,
        typeUser: st.LoginReducer.typeUser,
        isLogin: st.LoginReducer.isLogin,

        skillName: st.NavBarReducer.skillName,
        subSkillName: st.NavBarReducer.subSkillName
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => {
            dispatch(action.LogOut());
        },
        viewByList: (subSkillName) => {
            dispatch(action.ViewByListRequest(subSkillName));
        }
    };
};

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default NavBarContainer;
