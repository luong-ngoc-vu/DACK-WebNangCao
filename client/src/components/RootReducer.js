import {combineReducers} from 'redux';
import RegisterReducer from '../components/Register/RegisterReducer';
import LoginReducer from '../components/Login/LoginReducer';
import ViewDetailTutorReducer from "./DetailTutor/DetailTutorReducer";
import NavBarReducer from "./Common/NavBar/NavBarReducer";
import OrderReducer from "./HireOrder/OrderReducer";

const indexReducer = combineReducers({
    LoginReducer,
    RegisterReducer,
    ViewDetailTutorReducer,
    NavBarReducer,
    OrderReducer
});

export default indexReducer;
