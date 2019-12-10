import {combineReducers} from 'redux';
import CreateAdminReducer from '../components/CreateAdmin/CreateAdminReducer';
import LoginReducer from '../components/LoginAdmin/LoginReducer';

const indexReducer = combineReducers({
    CreateAdminReducer,
    LoginReducer
});

export default indexReducer;
