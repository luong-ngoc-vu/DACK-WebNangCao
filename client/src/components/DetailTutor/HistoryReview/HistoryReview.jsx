import React, { Component } from 'react';

import 'antd/dist/antd.css';
import { Comment, Tooltip, List, Rate } from 'antd';
import moment from 'moment';

class HistoryReview extends Component {
	render() {
		const { dataEvaluation } = this.props;
		const data = dataEvaluation.map((item) => ({
			author: item.nameStudent,
			avatar: item.imageStudent,
			content: (
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
					<p>{item.contentEvaluation}</p>
					<Rate disabled value={item.point} />
				</div>
			),
			datetime: (
				<Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
					<span>{moment().subtract(1, 'days').fromNow()}</span>
				</Tooltip>
			)
		}));

		return (
			<div>
				<List
					className="comment-list"
					header={`${data.length} đánh giá từ người học`}
					itemLayout="horizontal"
					dataSource={data}
					renderItem={(item) => (
						<li style={{ textAlign: 'left' }}>
							<Comment
								actions={item.actions}
								author={item.author}
								avatar={item.avatar}
								content={item.content}
								datetime={item.datetime}
							/>
						</li>
					)}
				/>
			</div>
		);
	}
}
export default HistoryReview;
