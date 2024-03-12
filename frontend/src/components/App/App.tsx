import { useState } from 'react';
import {
	MoneyCollectOutlined,
	DashboardOutlined,
	UserOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	FileTextOutlined,
} from '@ant-design/icons';
import './App.scss';
import { Layout, Menu, Button } from 'antd';
import { Outlet, Link } from 'react-router-dom';

const { Content, Sider } = Layout;

function App() {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Layout>
			<Sider
				style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
				trigger={null}
				collapsible
				collapsed={collapsed}>
				<div style={{ display: 'flex', justifyContent: 'flex-end'}}>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined style={{fontSize: '24px'}} /> : <MenuFoldOutlined style={{fontSize: '24px'}}/>}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '24px',
							width: 64,
							height: 64,
							color: 'white',
						}}
					/>
				</div>
				<div className="logo-box">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="white"
						className="bi bi-moisture"
						viewBox="0 0 16 16">
						<path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267" />
					</svg>
				</div>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['1']}
					items={[
						{
							key: '1',
							icon: <DashboardOutlined />,
							label: <Link to={`/`}>Dashboard</Link>,
						},
						{
							key: '2',
							icon: <UserOutlined />,
							label: <Link to={`customer`}>Customer</Link>,
						},
						{
							key: '3',
							icon: <MoneyCollectOutlined />,
							label: <Link to={`billing`}>Billing</Link>,
						},
						{
							key: '4',
							icon: <FileTextOutlined />,
							label: <Link to={`report`}>Report</Link>,
						},
					]}
				/>
			</Sider>
			<Layout style={collapsed ? { marginLeft: '90px' } : { marginLeft: '210px' }}>
				<Content style={{ margin: '24px 16px 24px 0', overflow: 'initial' }}>
					<div
						style={{
							minHeight: '80vh',
						}}>
						<Outlet />
					</div>
				</Content>
			</Layout>
		</Layout>
	);
}

export default App;
