import { Table, Space, TableProps, Button, Modal, Form, Input, DatePicker, Popconfirm } from 'antd';
import Search, { SearchProps } from 'antd/es/input/Search';
import { Breadcrumb } from 'antd';
import {
	createCustomer,
	deleteCustomer,
	getAllCustomers,
	updateCustomer,
} from '../../services/customer/customer.service';
import CustomerModel from '../../models/customer';
import { PlusOutlined } from '@ant-design/icons';
import './customer.scss';
import { useEffect, useReducer } from 'react';
import { showNotification } from '../../services/notificationService';

// Define the shape of the state used by the component
interface State {
	editData: CustomerModel | null; // Data of the customer being edited
	isModalOpen: boolean; // Whether the modal is open or not
	customers: CustomerModel[]; // Array of customers
}

// Define the Customer component
export default function Customer() {
	// Use useReducer hook to manage component state
	const [state, setState] = useReducer(
		(state: State, newState: Partial<State>) => ({
			...state,
			...newState,
		}),
		{
			editData: null,
			isModalOpen: false,
			customers: [],
		}
	);
	const [form] = Form.useForm(); // Initialize form for modal

	// Search callback function
	const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

	// Define columns for the Ant Design Table component
	const columns: TableProps<CustomerModel>['columns'] = [
		{
			title: 'Dhara No',
			dataIndex: 'dharaNo',
			key: 'dharaNo',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Button onClick={(_) => showModal(record)}>Edit</Button>
					<Popconfirm
						title="Delete the task"
						description="Are you sure to delete this task?"
						onConfirm={(_) => deleteConfirm(record)}
						okText="Yes"
						cancelText="No">
						<Button danger>Delete</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	// Load initial data on component mount
	useEffect(() => {
		populateTable();
	}, []);

	const populateTable = async () => {
		try {
			const customers = await getAllCustomers();
			setState({ customers: customers.data });
		} catch (error) {
			console.log(error);
		}
	};

	// Function to show the modal for editing or adding a customer
	const showModal = (record?: CustomerModel) => {
		form.resetFields(); // Reset form fields
		if (record) {
			// If editing an existing customer, populate form fields with existing data
			form.setFieldsValue({ dharaNo: record?.dharaNo, name: record?.name, phone: record?.phone });
		}
		setState({ isModalOpen: true, editData: record }); // Open modal and set data for editing
	};

	// Function to handle form submission when OK button is clicked
	const handleOk = () => {
		form
			.validateFields()
			.then(async (values) => {
				console.log(values);
				if (state.editData) {
					// If editData is present, update existing customer

					try {
						const res = await updateCustomer(state.editData.id, values);
						setState({
							isModalOpen: false,
							customers: state.customers.map((item) => (item.id === res.data.id ? res.data : item)),
						});
						showNotification(`success`, `Success`, res.message);
					} catch (err) {}
				} else {
					// If editData is not present, create a new customer
					try {
						const res = await createCustomer({ ...values });
						setState({
							isModalOpen: false,
							customers: [...state.customers, res.data],
						});
						showNotification(`success`, `Success`, res.message);
					} catch (err) {}
				}
			})
			.catch((info: any) => {
				console.log('Validate Failed:', info);
			});
	};

	// Function to handle cancellation of modal
	const handleCancel = () => {
		setState({ isModalOpen: false }); // Close modal
	};

	// Function to handle deletion confirmation of a customer
	const deleteConfirm = async (record: CustomerModel) => {
		try {
			const res = await deleteCustomer(record.id); // Delete customer
			setState({
				isModalOpen: false,
				customers: state.customers.filter(i => i.id !== record.id),
			});
			showNotification(`success`, `Success`, res.message);
		} catch (err) {}
	};

	// JSX rendering
	return (
		<>
			<Breadcrumb
				items={[
					{
						title: 'Customer',
					},
					{
						title: 'Customer Info',
					},
				]}
			/>
			<div className="customer basic-box">
				<div className="top-div">
					<Search
						size="large"
						className="search-box"
						placeholder="input search text"
						onSearch={onSearch}
						enterButton
					/>
					<Button size="large" onClick={(_) => showModal()} type="primary" icon={<PlusOutlined />}>
						Add
					</Button>
				</div>
				<div className="bottom-div">
					<Table
						columns={columns}
						dataSource={state.customers.map((customer) => ({ ...customer, key: customer.id }))}
					/>
				</div>
			</div>
			<Modal
				title={state.editData ? 'Edit Customer' : 'Add Customer'}
				open={state.isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<div>
					<Form
						form={form}
						name="basic"
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 16 }}
						initialValues={{ remember: true }}
						autoComplete="off">
						<Form.Item
							label="Name"
							name="name"
							rules={[{ required: true, message: 'Please input Name!' }]}>
							<Input />
						</Form.Item>
						<Form.Item
							label="Dhara No"
							name="dharaNo"
							rules={[{ required: true, message: 'Please input dhara no!' }]}>
							<Input />
						</Form.Item>
						<Form.Item label="Date of Birth" name="dob">
							<DatePicker />
						</Form.Item>
						<Form.Item label="Phone" name="phone">
							<Input />
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</>
	);
}
