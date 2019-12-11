export const initialState = {
    email: '',
    password: '',
    token: '',
    isLogin: false,
};

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            const st = {...state};
            console.log(action.data.res.message);
            if (action.data.res.message === "Request failed with status code 400") {
                st.token = 'err';
                return st;
            } else {
                st.email = action.data.res.data.admin.email;
                st.password = action.data.res.data.admin.password;
                try {
                    st.token = action.data.res.data.token;
                    st.isLogin = true;
                } catch (err) {
                    st.token = 'err';
                }
                return st;
            }
        }
        case 'LOGOUT': {
            return initialState;
        }
        default:
            return state;
    }
};

export default LoginReducer;
