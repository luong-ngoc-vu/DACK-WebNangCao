export const initialState = {
    email: '',
    name: '',
    phone: '',
    address: '',
    addressCity: '',
    typeUser: '',
    moreInfo: ''
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
            st.addressCity = data.addressCity;
            st.moreInfo = data.moreInfo;
            return st;
        }
        default:
            return state;
    }
};

export default ViewDetailUserReducer;
