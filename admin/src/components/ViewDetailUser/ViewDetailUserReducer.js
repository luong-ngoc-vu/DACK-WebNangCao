export const initialState = {
    email: '',
    name: '',
    phone: '',
    address: '',
    provinceName: '',
    districtName: '',
    wardName: '',
    typeUser: '',
    moreInfo: '',
    isLocked: false,
    idContract: '',
    idStudent: '',
    idTeacher: ''
};

const ViewDetailUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'VIEW_DETAIL_USER': {
            const st = {...state};
            const data = action.data.res.data[0];
            st.email = data.email;
            st.name = data.name;
            st.phone = data.phone;
            st.typeUser = data.typeUser;
            st.address = data.address;
            st.provinceName = data.provinceName;
            st.districtName = data.districtName;
            st.wardName = data.wardName;
            st.moreInfo = data.moreInfo;
            st.isLocked = data.isLocked;
            return st;
        }

        case 'VIEW_CONTRACT': {
            state.idContract = action.data.idContract;
            state.idStudent = action.data.idStudent;
            state.idTeacher = action.data.idTeacher;
            return state;
        }

        case 'LOCK_USER': {
            const st = {...state};
            const data = action.data.res.data;
            st.isLocked = data.isLocked;
            return st;
        }
        default:
            return state;
    }
};

export default ViewDetailUserReducer;
