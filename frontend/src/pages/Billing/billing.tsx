import { Table, Space, Tag, TableProps } from 'antd';
import Search, { SearchProps } from 'antd/es/input/Search';
import { Breadcrumb } from 'antd';

export default function Billing() {
	const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

	interface DataType {
		key: string;
		name: string;
		age: number;
		dharaNo: string;
		tags: string[];
	}

	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Dhara No',
			dataIndex: 'dharaNo',
			key: 'dharaNo',
		},
		{
			title: 'Tags',
			key: 'tags',
			dataIndex: 'tags',
			render: (_, { tags }) => (
				<>
					{tags.map((tag) => {
						let color = tag.length > 5 ? 'geekblue' : 'green';
						if (tag === 'loser') {
							color = 'volcano';
						}
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<a>Invite {record.name}</a>
					<a>Delete</a>
				</Space>
			),
		},
	];

	const data: DataType[] = [
		{
			key: '1',
			name: 'John Brown',
			age: 32,
			dharaNo: 'New York No. 1 Lake Park',
			tags: ['nice', 'developer'],
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			dharaNo: 'London No. 1 Lake Park',
			tags: ['loser'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			dharaNo: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
	];

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
			<div className="billing basic-box">
				<Search placeholder="input search text" onSearch={onSearch} enterButton />
				<div>
					<Table columns={columns} dataSource={data} />
				</div>
			</div>
		</>
	);
}
