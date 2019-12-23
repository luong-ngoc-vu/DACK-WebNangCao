import axios from "axios";

export const ADD_NEW_CONTRACT = 'ADD_NEW_CONTRACT';

function OnclickAddNewContract(idStudent, idTeacher, nameStudent, nameTeacher, genderStudent, moneyTeacherPerHour, totalMoneyContract, skills,
                               schedule, numberOfLesson, address, provinceName, districtName, wardName, hourPerLesson, note, dateContract,
                               genderTeacher, imgTeacher, imgStudent, phoneTeacher, addressTeacher, addressStudent, teacherTopic, phoneStudent) {
    return axios.post('http://localhost:4000/contract/addNewContract', {
        idStudent,
        idTeacher,
        nameStudent,
        nameTeacher,
        genderStudent,
        moneyTeacherPerHour,
        totalMoneyContract,
        skills,
        schedule,
        numberOfLesson,
        address,
        provinceName,
        districtName,
        wardName,
        hourPerLesson,
        note,
        dateContract, genderTeacher, imgTeacher, imgStudent, phoneTeacher, addressTeacher, addressStudent, teacherTopic, phoneStudent
    }).catch(error => {
        return error;
    });
}

export const addNewContract = (res) => {
    return {
        type: ADD_NEW_CONTRACT,
        data: {res}
    };
};

export const addNewContractRequest = (idStudent, idTeacher, nameStudent, nameTeacher, genderStudent, moneyTeacherPerHour, totalMoneyContract,
                                      skills, schedule, numberOfLesson, address, provinceName, districtName, wardName, hourPerLesson, note,
                                      dateContract, genderTeacher, imgTeacher, imgStudent, phoneTeacher, addressTeacher, addressStudent, teacherTopic, phoneStudent) => {
    return dispatch => {
        return OnclickAddNewContract(idStudent, idTeacher, nameStudent, nameTeacher, genderStudent, moneyTeacherPerHour,
            totalMoneyContract, skills, schedule, numberOfLesson, address, provinceName, districtName, wardName, hourPerLesson, note, dateContract,
            genderTeacher, imgTeacher, imgStudent, phoneTeacher, addressTeacher, addressStudent, teacherTopic, phoneStudent).then(res => {
            dispatch(addNewContract(res));
        });
    };
};
