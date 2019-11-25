import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import RegisterReducer from "./RegisterReducer";

const indexReducer = combineReducers({
    UserReducer,
    RegisterReducer
});

export default indexReducer;
