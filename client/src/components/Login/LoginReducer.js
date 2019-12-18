export const initialState = {
    email: '',
    password: '',
    name: '',
    phone: '',
    image: '',
    address: '',
    provinceName: '',
    districtName: '',
    wardName: '',
    moreInfo: '',
    skills: '',
    levelStudy: '',
    curPosition: '',
    certificates: '',
    school: '',
    money: 1,
    curMoney: 1,
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
            const data = action.data.res.data.user;
            if (action.data.res.message === "Request failed with status code 400") {
                st.token = 'err';
                return st;
            } else {
                st.email = data.email;
                st.password = data.password;
                try {
                    st.token = action.data.res.data.token;
                    st.name = data.name;
                    st.image = data.image;
                    st.phone = data.phone;
                    st.address = data.address;
                    st.provinceName = data.provinceName;
                    st.districtName = data.districtName;
                    st.wardName = data.wardName;
                    st.skills = data.skills;
                    st.levelStudy = data.levelStudy;
                    st.curPosition = data.curPosition;
                    st.certificates = data.certificates;
                    st.moreInfo = data.moreInfo;
                    st.typeUser = data.typeUser;
                    st.school = data.school;
                    st.money = data.money;
                    st.curMoney = data.curMoney;
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
            const data = action.data.res.data;
            st.name = data.name;
            st.phone = data.phone;
            st.image = data.image;
            st.address = data.address;
            st.provinceName = data.provinceName;
            st.districtName = data.districtName;
            st.wardName = data.wardName;
            st.moreInfo = data.moreInfo;
            st.skills = data.skills;
            st.levelStudy = data.levelStudy;
            st.curPosition = data.curPosition;
            st.certificates = data.certificates;
            st.school = data.school;
            st.money = data.money;
            st.curMoney = data.curMoney;
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

        case 'LOGOUT': {
            return initialState;
        }

        default:
            return state;
    }
};

export default LoginReducer;
