export const initialState = {
    email: '',
    password: '',
    name: '',
    phone: '',
    image: '',
    address: '',
    addressCity: '',
    moreInfo: '',
    token: '',
    typeUser: 1,
    isLogin: false,
    isLoginFB: false,
    isLoginGG: false,
    isRightPassword: '',
};

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            const st = {...state};
            if (action.data.res.message === "Request failed with status code 400") {
                st.token = 'err';
                return st;
            } else {
                st.email = action.data.res.data.user.email;
                st.password = action.data.res.data.user.password;
                try {
                    st.token = action.data.res.data.token;
                    st.name = action.data.res.data.user.name;
                    st.image = action.data.res.data.user.image;
                    st.phone = action.data.res.data.user.phone;
                    st.address = action.data.res.data.user.address;
                    st.addressCity = action.data.res.data.user.addressCity;
                    st.moreInfo = action.data.res.data.user.moreInfo;
                    st.typeUser = action.data.res.data.user.typeUser;
                    st.isLogin = true;
                    st.isLoginFB = false;
                    st.isLoginGG = false;
                } catch (err) {
                    st.token = 'err';
                }
                return st;
            }
        }

        case 'LOGIN_FACEBOOK': {
            const st = {...state};
            st.name = action.data.res.name;
            st.email = action.data.res.email;
            st.image = action.data.res.picture.data.url;
            st.typeUser = action.data.typeUser;
            st.isLogin = true;
            st.isLoginFB = true;
            st.isLoginGG = false;
            try {
                st.token = action.data.res.accessToken;
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
            st.typeUser = action.data.typeUser;
            st.isLogin = true;
            st.isLoginGG = true;
            st.isLoginFB = false;

            try {
                st.token = action.data.res.Zi.access_token;
            } catch (err) {
                st.token = 'err';
            }
            return st;
        }

        case 'UPDATE': {
            const st = {...state};
            st.email = action.data.res.data.email;
            st.name = action.data.res.data.name;
            st.phone = action.data.res.data.phone;
            st.image = action.data.res.data.image;
            st.address = action.data.res.data.address;
            st.addressCity = action.data.res.data.addressCity;
            st.moreInfo = action.data.res.data.moreInfo;
            return st;
        }

        case 'CHANGE_PASSWORD': {
            const st = {...state};
            if (action.data.res.message === "Request failed with status code 400") {
                st.isRightPassword = 'err';
                return st;
            } else {
                st.password = action.data.newpassword;
                st.isRightPassword = 'success';
            }
            return st;
        }

        case "REGISTER_SOCIAL": {
            const st = {...state};
            st.email = action.data.email;
            st.name = action.data.name;
            st.phone = action.data.phone;
            st.image = action.data.image;
            st.address = action.data.address;
            st.moreInfo = action.data.moreInfo;
            return st;
        }

        case 'LOGOUT': {
            return initialState;
        }

        default:
            return state;
    }
};

export default LoginReducer;
