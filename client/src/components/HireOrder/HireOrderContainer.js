import {connect} from 'react-redux';
import HireOrder from './HireOrder';
import * as actions from "../HireOrder/HireOrderAction";

const mapStateToProps = (st) => {
    let detailTutorReducer = st.ViewDetailTutorReducer;
    let loginReducer = st.LoginReducer;
    return {
        nameTeacher: detailTutorReducer.name,
        phone: detailTutorReducer.phone,
        address: detailTutorReducer.address,
        provinceName: detailTutorReducer.provinceName,
        districtName: detailTutorReducer.districtName,
        wardName: detailTutorReducer.wardName,
        skills: detailTutorReducer.skills,
        moneyTeacherPerHour: detailTutorReducer.money,
        idTeacher: detailTutorReducer.idTeacher,
        genderTeacher: detailTutorReducer.gender,
        imgTeacher: detailTutorReducer.image,
        phoneTeacher: detailTutorReducer.phone,
        addressTeacher: detailTutorReducer.address + ", " + detailTutorReducer.wardName + ", " +
            detailTutorReducer.districtName + ", " + detailTutorReducer.provinceName,

        curMoneyStudent: loginReducer.curMoney,
        isLogin: loginReducer.isLogin,
        nameStudent: loginReducer.name,
        idStudent: loginReducer.idUser,
        genderStudent: loginReducer.gender,
        phoneStudent: loginReducer.phone,
        imgStudent: loginReducer.image,
        addressStudent: loginReducer.address + ", " + loginReducer.wardName + ", " +
            loginReducer.districtName + ", " + loginReducer.provinceName,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addNewContract: (idStudent, idTeacher, nameStudent, nameTeacher, genderStudent, moneyTeacherPerHour, totalMoneyContract, skills,
                         schedule, numberOfLesson, address, provinceName, districtName, wardName, hourPerLesson, note, dateContract, genderTeacher,
                         imgTeacher, imgStudent, phoneTeacher, addressTeacher, addressStudent, teacherTopic, phoneStudent) => {
            dispatch(actions.addNewContractRequest(idStudent, idTeacher, nameStudent, nameTeacher, genderStudent, moneyTeacherPerHour, totalMoneyContract
                , skills, schedule, numberOfLesson, address, provinceName, districtName, wardName, hourPerLesson, note,
                dateContract, genderTeacher, imgTeacher, imgStudent, phoneTeacher, addressTeacher, addressStudent, teacherTopic, phoneStudent));
        }
    };
};

const HireOrderContainer = connect(mapStateToProps, mapDispatchToProps)(HireOrder);

export default HireOrderContainer;
