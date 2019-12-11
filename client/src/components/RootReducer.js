import {combineReducers} from 'redux';
import RegisterReducer from '../components/Register/RegisterReducer';
import LoginReducer from '../components/Login/LoginReducer';
import ViewDetailTutorReducer from "./DetailTutor/DetailTutorReducer";

const indexReducer = combineReducers({
    LoginReducer,
    RegisterReducer,
    ViewDetailTutorReducer
});

export default indexReducer;
