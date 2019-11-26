export const initialState = {
    username: '',
    password: '',
    name: '',
    phone: '',
    email: '',
    token: '',
    image: '',
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
                st.image = action.data.res.data.user.image;
                st.isLogin = true;
            } catch (err) {
                st.token = 'err';
            }
            return st;
        }

        case 'LOGIN_FACEBOOK': {
            const st = {...state};
            st.name = action.data.res.name;
            st.email = action.data.res.email;
            st.image = action.data.res.picture.data.url;
            try {
                st.token = action.data.res.accessToken;
                st.isLogin = true;
            } catch (err) {
                st.token = 'err';
            }
            return st;
        }

        case 'LOGIN_GOOGLE': {
            const st = {...state};
            st.name = action.data.res.w3.ig;
            st.email = action.data.res.w3.U3;
            st.image = action.data.res.w3.Paa;

            try {
                st.token = action.data.res.Zi.access_token;
                st.isLogin = true;
            } catch (err) {
                st.token = 'err';
            }
            return st;
        }

        case 'UPDATE': {
            const st = {...state};
            st.username = action.data.username;

            st.name = action.data.res.data.name;
            st.phone = action.data.res.data.phone;
            st.email = action.data.res.data.email;
            st.image = action.data.res.data.image;
            return st;
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
