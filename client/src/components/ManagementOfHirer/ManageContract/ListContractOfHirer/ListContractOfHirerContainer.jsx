import { connect } from 'react-redux';
import ListContractOfHirer from './ListContractOfHirer';

const mapStateToProps = (state) => ({
	isLogin: st.LoginReducer.isLogin,
	nameStudent: st.LoginReducer.name,
	idStudent: st.LoginReducer.idUser
});
export default connect(mapStateToProps, mapDispatchToProps)(ListContractOfHirer);
