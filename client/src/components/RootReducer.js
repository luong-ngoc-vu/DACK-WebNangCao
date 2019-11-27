import {combineReducers} from 'redux';
import RegisterReducer from '../components/Register/RegisterReducer';
import LoginReducer from '../components/Login/LoginReducer';

const indexReducer = combineReducers({
    LoginReducer,
    RegisterReducer
});

export default indexReducer;
