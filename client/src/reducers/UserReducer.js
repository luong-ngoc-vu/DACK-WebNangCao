export const initialState = {
    username: '',
    password: '',
    name: '',
    phone: '',
    email: '',
    token: '',
    isLogin: false,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            const st = {...state};

            st.username = action.data.username;
            st.password = action.data.password;
            try {
                st.token = action.data.res.data.token;
                st.name = action.data.res.data.user.name;
                st.phone = action.data.res.data.user.phone;
                st.email = action.data.res.data.user.email;
                st.isLogin = true;

            } catch (err) {
                st.token = 'err';
            }
            return st;
        }

        case 'UPDATE': {
            return {
                ...state,
                username: action.data.res.data.username,
                name: action.data.res.data.name,
                phone: action.data.res.data.phone,
                email: action.data.res.data.email
            };
        }

        case 'CHANGE_PASSWORD': {

            return {
                ...state,
                password: action.data.newpassword
            };
        }

        case 'LOGOUT': {
            return initialState;
        }

        default:
            return state;
    }
};

export default UserReducer;
