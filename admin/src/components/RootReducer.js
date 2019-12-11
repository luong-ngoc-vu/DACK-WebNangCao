import {combineReducers} from 'redux';
import CreateAdminReducer from '../components/CreateAdmin/CreateAdminReducer';
import LoginReducer from '../components/LoginAdmin/LoginReducer';
import ViewDetailUserReducer from "./ViewDetailUser/ViewDetailUserReducer";
import Skill from "./CreateSkill/CreateSkillReducer";

const indexReducer = combineReducers({
    Skill,
    CreateAdminReducer,
    LoginReducer,
    ViewDetailUserReducer,
});

export default indexReducer;
