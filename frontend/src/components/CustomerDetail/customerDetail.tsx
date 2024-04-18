import { UserOutlined } from '@ant-design/icons';
import './CustomerDetail.scss';
import CustomerModel from '../../models/customer';

export default function CustomerDetail(props: { customer: CustomerModel }) {
	const { customer } = props;
	return (
		<div className="customer-detail">
			<div>
				<UserOutlined style={{ fontSize: '100px' }} />
			</div>
			<div>
				<div className="title-label">
					<div className="title">Name</div>
					<div className="label">{customer.name}</div>
				</div>
				<div className="title-label">
					<div className="title">Dhara No</div>
					<div className="label">{customer.dharaNo}</div>
				</div>
				<div className="title-label">
					<div className="title">Phone</div>
					<div className="label">{customer.phone}</div>
				</div>
			</div>
		</div>
	);
}
