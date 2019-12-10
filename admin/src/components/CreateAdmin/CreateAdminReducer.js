export const initialState = {
    isCreateAdmin: '',
    checkCreateAdmin: false
};

const CreateAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_ADMIN": {
            const st = {...state};
            if (action.data.res.message === "Request failed with status code 400") {
                st.checkCreateAdmin = false;
                st.isCreateAdmin = 'err';
                return st;
            } else {
                st.isCreateAdmin = 'success';
                st.checkCreateAdmin = true;
            }
            return st;
        }
        default:
            return initialState;
    }
};

export default CreateAdminReducer;
