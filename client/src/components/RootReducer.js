import {combineReducers} from 'redux';
import RegisterReducer from '../components/Register/RegisterReducer';
import LoginReducer from '../components/Login/LoginReducer';
import ViewDetailTutorReducer from "./DetailTutor/DetailTutorReducer";
import NavBarReducer from "./Common/NavBar/NavBarReducer";

const indexReducer = combineReducers({
    LoginReducer,
    RegisterReducer,
    ViewDetailTutorReducer,
    NavBarReducer
});

export default indexReducer;
