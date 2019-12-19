export const initialState = {
    idStudent: '',
    idTeacher: '',
    nameStudent: '',
    nameTeacher: '',
    genderStudent: '',
    moneyTeacherPerHour: 1,
    totalMoneyContract: 1,
    skills: '',
    schedule: '',
    numberOfLesson: 1,
    address: '',
    provinceName: '',
    districtName: '',
    wardName: '',
    hourPerLesson: 1,
    note: '',
    dateContract: '',
    isSendRequestStatus: '',
};

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_NEW_CONTRACT": {
            const st = {...state};
            try {
                const data = action.data.res;
                st.idStudent = data.idStudent;
                st.idTeacher = data.idTeacher;
                st.nameStudent = data.nameStudent;
                st.nameTeacher = data.nameTeacher;
                st.genderStudent = data.genderStudent;
                st.moneyTeacherPerHour = data.moneyTeacherPerHour;
                st.totalMoneyContract = data.totalMoneyContract;
                st.skills = data.skills;
                st.schedule = data.schedule;
                st.numberOfLesson = data.numberOfLesson;
                st.address = data.address;
                st.provinceName = data.provinceName;
                st.districtName = data.districtName;
                st.wardName = data.wardName;
                st.hourPerLesson = data.hourPerLesson;
                st.note = data.note;
                st.dateContract = data.dateContract;
                st.isSendRequestStatus = 'success';
                console.log("Order Reducer: " + st);
            } catch (error) {
                st.isSendRequestStatus = 'err';
            }
            return st;
        }
        default:
            return initialState;
    }
};

export default OrderReducer;
