import BillModel from '../../models/bill';
import CustomerModel from '../../models/customer';

export default function Bill(props: { customer: CustomerModel; bill: BillModel }) {
	const { customer, bill } = props;
	return (
		<div className="info-box">
			<div className="billing-info basic-box">
				<div className="info">
					<div>
						<div className="title-label">
							<div className="title">Name</div>
							<div className="label">{customer?.name}</div>
						</div>
						<div className="title-label">
							<div className="title">From</div>
							<div className="label">{bill.billFrom}</div>
						</div>
					</div>
					<div>
						<div className="title-label">
							<div className="title">Dhara No</div>
							<div className="label">{customer?.dharaNo}</div>
						</div>
						<div className="title-label">
							<div className="title">To</div>
							<div className="label">{bill.billTo}</div>
						</div>
					</div>
				</div>
				<div className="summary">
					<div>
						<div>Last Read</div>
						<div>{bill.previousRead}</div>
					</div>
					<div>
						<div>Current Read</div>
						<div>{bill.currentRead}</div>
					</div>
					<div>
						<div>Price Per Meter</div>
						<div>2.0</div>
					</div>
				</div>
				<div className="bill">
					<table>
						<tbody>
							<tr>
								<th>Desc</th>
								<th>Usage</th>
								<th className="price">Price</th>
							</tr>
							<tr>
								<td>water</td>
								<td>{bill.currentRead - bill.previousRead}</td>
								<td className="price">{`${bill.totalAmount}`}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
