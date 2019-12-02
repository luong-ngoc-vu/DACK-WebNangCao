export const initialState = {
    email: '',
    password: '',
    name: '',
    phone: '',
    image: '',
    address: '',
    moreInfo: '',
    token: '',
    typeUser: 1,
    isLogin: false,
};

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            const st = {...state};
            st.email = action.data.email;
            st.password = action.data.password;
            try {
                st.token = action.data.res.data.token;
                st.name = action.data.res.data.user.name;
                st.phone = action.data.res.data.user.phone;
                st.image = action.data.res.data.user.image;
                st.address = action.data.res.data.user.address;
                st.moreInfo = action.data.res.data.user.moreInfo;
                st.typeUser = action.data.res.data.user.typeUser;
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
            st.typeUser = 1;
            try {
                st.token = action.data.res.accessToken;
                st.isLogin = true;
                st.isLoginFB = true;
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
            st.typeUser = 1;

            try {
                st.token = action.data.res.Zi.access_token;
                st.isLogin = true;
                st.isLoginGG = true;
            } catch (err) {
                st.token = 'err';
            }
            return st;
        }

        case 'UPDATE': {
            const st = {...state};
            st.email = action.data.email;

            st.name = action.data.res.data.name;
            st.phone = action.data.res.data.phone;
            st.image = action.data.res.data.image;
            st.address = action.data.res.data.address;
            st.moreInfo = action.data.res.data.moreInfo;
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

export default LoginReducer;
