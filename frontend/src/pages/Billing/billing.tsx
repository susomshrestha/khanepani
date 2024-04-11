import { Breadcrumb, Button, DatePicker, Form, InputNumber, Modal, Select } from 'antd';
import { useState } from 'react';
import { getAllCustomers } from '../../services/customer/customer.service';
import CustomerModel from '../../models/customer';
import './billing.scss';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export default function Billing() {
	const [searchResult, setSearchResult] = useState<CustomerModel[]>([]);
	const [searchVal, setSearchVal] = useState<string>();
	const [customer, setCustomer] = useState<CustomerModel>();
	const [isUpdateMeterModalOpen, setIsUpdateMeterModalOpen] = useState(false);

	const [form] = Form.useForm();

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
		setCustomer(cus);
	};

	const showUpdateMeterModal = () => {
		form.resetFields();
		setIsUpdateMeterModalOpen(true);
	};

	const handleUpdateMeterModalOk = () => {
		setIsUpdateMeterModalOpen(false);
	};

	const handleUpdateMeterModalCancel = () => {
		setIsUpdateMeterModalOpen(false);
	};

	return (
		<>
			<Breadcrumb
				items={[
					{
						title: 'Billing',
					},
					{
						title: 'Billing Info',
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
			<div className="basic-box customer-info">
				<div className="customer-detail">
					<div className="">
						<UserOutlined style={{ fontSize: '100px' }} />
					</div>
					<div>
						<div className="title-label">
							<div className="title">Name</div>
							<div className="label">{'Ram Sherstha'}</div>
						</div>
						<div className="title-label">
							<div className="title">Dhara No</div>
							<div className="label">{'123'}</div>
						</div>
						<div className="title-label">
							<div className="title">Phone</div>
							<div className="label">{'41234123412'}</div>
						</div>
					</div>
				</div>
				<div className="meter-info">
					<div className="last-meter">
						<div className="title">Last Meter Read</div>
						<div className="label">{'120'}</div>
					</div>
					<div className="btn-div">
						<Button onClick={showUpdateMeterModal} className="btn btn-green">
							Update Meter Reading
						</Button>
					</div>
				</div>
			</div>
			<div className="info-box">
				<div className="billing-info basic-box">
					<div className="info">
						<div>
							<div className="title-label">
								<div className="title">Name</div>
								<div className="label">{'Ram Sherstha'}</div>
							</div>
							<div className="title-label">
								<div className="title">From</div>
								<div className="label">{'2024-01-01'}</div>
							</div>
						</div>
						<div>
							<div className="title-label">
								<div className="title">Dhara No</div>
								<div className="label">{'12'}</div>
							</div>
							<div className="title-label">
								<div className="title">To</div>
								<div className="label">{'2024-01-31'}</div>
							</div>
						</div>
					</div>
					<div className="summary">
						<div>
							<div>Last Read</div>
							<div>100</div>
						</div>
						<div>
							<div>Current Read</div>
							<div>150</div>
						</div>
						<div>
							<div>Price Per Meter</div>
							<div>1.0</div>
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
									<td>50</td>
									<td className="price">50</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<Modal
				title="Update Meter"
				open={isUpdateMeterModalOpen}
				onOk={handleUpdateMeterModalOk}
				onCancel={handleUpdateMeterModalCancel}>
				<div>
					<Form
						form={form}
						name="basic"
						initialValues={{ remember: true }}
						layout="vertical"
						autoComplete="off">
						<Form.Item label="Month" name="month">
							<DatePicker picker="month" />
						</Form.Item>
						<Form.Item label="New Meter Reading" name="meter">
							<InputNumber />
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</>
	);
}
