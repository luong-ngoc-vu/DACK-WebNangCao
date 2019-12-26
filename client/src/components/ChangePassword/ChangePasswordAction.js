import axios from 'axios';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

/* ====================== CHANGE PASSWORD ====================== */
function onClickChangePassword(email, password, newpassword) {
  return axios.post('https://apiclientwebsitethuegiasu.herokuapp.com/user/changePass', {
    email, password, newpassword
  }).catch(err => {
    return err;
  });
}

export const changePassword = (email, password, newpassword, res) => {
  return {
    type: CHANGE_PASSWORD,
    data: {
      email, password, newpassword, res
    }
  };
};

export const changePasswordRequest = (email, password, newpassword) => {
  return (dispatch => {
    return onClickChangePassword(email, password, newpassword).then(res => {
      dispatch(changePassword(email, password, newpassword, res));
    });
  });
};
