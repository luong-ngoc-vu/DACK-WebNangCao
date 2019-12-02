export const initialState = {
    isRegister: '',
    checkRegister: false
};

const RegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER": {
            const st = {...state};
            if (action.data.res.message === "Request failed with status code 400") {
                st.checkRegister = false;
                st.isRegister = 'err';
                return st;
            } else {
                st.email = action.data.email;
                st.password = action.data.password;
                try {
                    st.name = action.data.res.name;
                    st.phone = action.data.res.phone;
                    st.image = action.data.res.image;
                    st.address = action.data.res.address;
                    st.moreInfo = action.data.res.moreInfo;
                    st.typeUser = action.data.res.typeUser;
                    st.isRegister = 'success';
                    st.checkRegister = true;
                } catch (error) {
                    st.isRegister = 'err';
                }
            }
            return st;
        }
        default:
            return initialState;
    }
};

export default RegisterReducer;
