export const initialState = {
    userID: '',
    username: '',
    password: '',
    token: '',
    isLogin: false,
    isRightPassword: '',
    role: '',
};

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            const st = { ...state };

            const data = action.data.res.data;
            if (action.data.res.message === "Username or password is incorrect") {
                st.token = 'err';
                return st;
            } else {
                st.username = data.username;
                st.userID = data._id;
                st.token = data.token;
                st.firstName = data.firstName;
                st.lastName = data.lastName;
                st.role = data.role;
                st.isLogin =true;
                console.log(st);
                return st;
            }
        }
        default: return state;
    }
    //return state;
};

export default LoginReducer;
