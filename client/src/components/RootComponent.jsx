import React from 'react';
import { BrowserRouter, Route, useParams } from 'react-router-dom';

import { Col, Layout, Row } from 'antd';
import LoginContainer from './Login/LoginContainer';
import RegisterContainer from './Register/RegisterContainer';
import ManagementTutorContriner from './ManagementOfTutor/ManagementTutorContainer';
import ManagementHirerContainer from './ManagementOfHirer/ManagementHirerContainer';
import NavBarContriner from './Common/NavBar/NavBarContainer';
import Home from './Home/Home';
import DetailTutorContainer from './DetailTutor/DetailTutorContainer';
import Footer from './Common/Footer/Footer';
import BannerBackground from './Home/BannerBackground/BannerBackground';
import { ListTutorialsBySkillContainer } from './Home/OutstandingTutorList/OutstandingTutorListContainer';
import StepGuide from './Home/StepGuide/StepGuide';

import { ListTutorContainer } from './ListTutor/ListTutorContainer';

const { Content } = Layout;

function Root() {
	return (
		<BrowserRouter>
			<Layout style={{ textAlign: 'center', backgroundColor: 'white' }}>
				<NavBarContriner />

				<Content>
					<Route exact path="/">
						<BannerBackground />
						<Home />
					</Route>
					<Route exact path="/home">
						<BannerBackground />
						<Home />
					</Route>
					<Route exact path="/listTutorialsBySkill">
						<BannerBackground />
						<Row gutter={24}>
							<Col span={3} />
							<Col span={18}>
								<ListTutorialsBySkillContainer />
								<StepGuide />
							</Col>
						</Row>
					</Route>
					<Row>
						<Col span={3} />
						<Col span={18}>
							<Content
								style={{
									margin: '10px 0px',
									backgroundColor: 'white'
								}}
							>
								<Route path="/register" component={RegisterContainer} />
								<Route path="/login" component={LoginContainer} />
								<Route path="/tutor-manage" component={ManagementTutorContriner} />
								<Route path="/hirer-manage" component={ManagementHirerContainer} />
								<Route path="/view-more-tutor/:name">
									<ListTutorContainer />
								</Route>
								<Route path="/view-more-tutor" component={ListTutorContainer} />
								<Route path="/detailTutor/:id" component={DetailTutorContainer} />
							</Content>
						</Col>
						<Col span={3} />
					</Row>
				</Content>
				<Footer />
			</Layout>
		</BrowserRouter>
	);
}

export default Root;
