import { Breadcrumb, Button, Select } from 'antd';
import CustomerModel from '../../models/customer';
import { useState } from 'react';
import { getAllCustomers } from '../../services/customer/customer.service';
import { getLastBill } from '../../services/billing/billing.service';
import BillModel from '../../models/bill';
import { getDate } from '../../services/util';
import CustomerDetail from '../../components/CustomerDetail/customerDetail';
import Bill from '../../components/Bill/bill';
import './payment.scss';

export default function Payment() {
	const [searchResult, setSearchResult] = useState<CustomerModel[]>([]);
	const [searchVal, setSearchVal] = useState<string>();
	const [customer, setCustomer] = useState<CustomerModel>();
	const [bill, setBill] = useState<BillModel>();

	let timeout: ReturnType<typeof setTimeout> | null;
	let currentValue: string;

	const fetch = (value: string, callback: Function) => {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
		currentValue = value;

		const getSearchData = () => {
			getAllCustomers().then((res: any) => {
				if (currentValue === value) {
					callback(res.data);
				}
			});
		};
		if (value) {
			timeout = setTimeout(getSearchData, 500);
		} else {
			callback([]);
		}
	};

	const handleSearch = (newValue: string) => {
		fetch(newValue, setSearchResult);
	};

	const handleChange = (newValue: string) => {
		setSearchVal(newValue);
		const cus = searchResult?.find((i) => i.dharaNo === newValue);

		if (cus) {
			setCustomer(cus as CustomerModel);

			getLastBill(cus.id)
				.then((res) => {
					const bill = res.data as BillModel;
					if (bill) {
						bill.billFrom = getDate(bill.billDate);
						bill.billTo = getDate(bill.billDate, true);
					}
					setBill(bill || null);
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<>
			<Breadcrumb
				items={[
					{
						title: 'Payment',
					},
					{
						title: 'Payment Info',
					},
				]}
			/>
			<div className="search-box basic-box">
				<div className="search-label">Dhara No</div>
				<Select
					className="search-input"
					showSearch
					value={searchVal}
					placeholder={'Enter Dhara No'}
					defaultActiveFirstOption={false}
					suffixIcon={null}
					filterOption={false}
					onSearch={handleSearch}
					onChange={handleChange}
					notFoundContent={null}
					options={(searchResult || []).map((d) => ({
						value: d.dharaNo,
						label: `${d.dharaNo} : ${d.name}`,
					}))}
				/>
			</div>
			{customer && (
				<>
					<div className="basic-box info-box">
						<CustomerDetail customer={customer} />
						<div className="payment-info">
							<div className="last-meter">
								<div className="title">Payment</div>
								<div className="label">{`${bill?.totalAmount || 0}`}</div>
							</div>
							<div className="btn-div">
								<Button className="btn btn-green">
									Mark As Paid
								</Button>
							</div>
						</div>
					</div>
					{bill && (
						<div className="basic-box">
							<Bill bill={bill} customer={customer}></Bill>
						</div>
					)}
				</>
			)}
		</>
	);
}
