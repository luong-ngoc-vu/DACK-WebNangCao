export const initialState = {
    email: '',
    name: '',
    phone: '',
    address: '',
    addressCity: '',
    typeUser: '',
    moreInfo: '',
    image: '',
    skills: '',
    curPosition: '',
    certificates: '',
    levelStudy: '',
    money: ''
};

const ViewDetailTutorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'VIEW_DETAIL_TUTOR': {
            const st = {...state};
            const data = action.data.res.data[0];
            st.email = data.email;
            st.name = data.name;
            st.phone = data.phone;
            st.typeUser = data.typeUser;
            st.address = data.address;
            st.addressCity = data.addressCity;
            st.moreInfo = data.moreInfo;
            st.image = data.image;
            st.skills = data.skills;
            st.curPosition = data.curPosition;
            st.certificates = data.certificates;
            st.levelStudy = data.levelStudy;
            st.money = data.money;
            return st;
        }
        default:
            return state;
    }
};

export default ViewDetailTutorReducer;
