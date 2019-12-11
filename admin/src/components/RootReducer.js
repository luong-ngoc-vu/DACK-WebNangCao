import {combineReducers} from 'redux';
import CreateAdminReducer from '../components/CreateAdmin/CreateAdminReducer';
import LoginReducer from '../components/LoginAdmin/LoginReducer';
import ViewListUserReducer from "./ViewListUsers/ViewListUserReducer";

const indexReducer = combineReducers({
    CreateAdminReducer,
    LoginReducer,
    ViewListUserReducer
});

export default indexReducer;
