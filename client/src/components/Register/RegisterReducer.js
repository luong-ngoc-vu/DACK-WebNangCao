export const initialState = {
    isRegister: '',
    checkRegister: false
};

const RegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER": {
            const st = {...state};
            st.username = action.data.username;
            st.password = action.data.password;
            try {
                st.name = action.data.res.name;
                st.email = action.data.res.email;
                st.phone = action.data.res.phone;
                st.image = action.data.res.image;
                st.isRegister = 'success';
                st.checkRegister = true;
            } catch (error) {
                st.isRegister = 'err';
            }
            return st;
        }
        default:
            return initialState;
    }
};

export default RegisterReducer;
