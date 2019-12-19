import {connect} from 'react-redux';
import HireOrder from './HireOrder';
import * as actions from "../HireOrder/HireOrderAction";

const mapStateToProps = (st) => {
    return {
        nameTeacher: st.ViewDetailTutorReducer.name,
        phone: st.ViewDetailTutorReducer.phone,
        address: st.ViewDetailTutorReducer.address,
        provinceName: st.ViewDetailTutorReducer.provinceName,
        districtName: st.ViewDetailTutorReducer.districtName,
        wardName: st.ViewDetailTutorReducer.wardName,
        skills: st.ViewDetailTutorReducer.skills,
        moneyTeacherPerHour: st.ViewDetailTutorReducer.money,
        idTeacher: st.ViewDetailTutorReducer.idTeacher,

        curMoneyStudent: st.LoginReducer.curMoney,
        isLogin: st.LoginReducer.isLogin,
        nameStudent: st.LoginReducer.name,
        idStudent: st.LoginReducer.idUser,
        genderStudent: st.LoginReducer.gender,

        isSendRequestStatus: st.OrderReducer.isSendRequestStatus,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addNewContract: (idStudent, idTeacher, nameStudent, nameTeacher, genderStudent, moneyTeacherPerHour, totalMoneyContract, skills,
                         schedule, numberOfLesson, address, provinceName, districtName, wardName, hourPerLesson, note, dateContract) => {
            dispatch(actions.addNewContractRequest(idStudent, idTeacher, nameStudent, nameTeacher, genderStudent, moneyTeacherPerHour, totalMoneyContract, skills,
                schedule, numberOfLesson, address, provinceName, districtName, wardName, hourPerLesson, note, dateContract));
        }
    };
};

const HireOrderContainer = connect(mapStateToProps, mapDispatchToProps)(HireOrder);

export default HireOrderContainer;
