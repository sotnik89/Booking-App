import { Outlet, NavLink } from 'react-router-dom';
import { Layout as AntLayout, Menu, Typography } from 'antd';

const {Header, Content, Footer} = AntLayout;
const {Text} = Typography;

const menuItems = [
    {
        key: '/',
        label: <NavLink to='/'>Home</NavLink>
    },
    {
        key: '/hotels',
        label: <NavLink to='/hotels'>Hotels</NavLink>
    },
    {
        key: '/about',
        label: <NavLink to='/about'>About</NavLink>
    },
    {
        key: '/contactus',
        label: <NavLink to='/registration'>Registration</NavLink>
    }
];
export default function MainLayout() {
    return (
        <AntLayout style={{minHeight: '100vh'}}>
            <Header>
                <Menu
                    theme='dark'
                    mode='horizontal'
                    items={menuItems}
                    style={{flex: 1, minWidth: 0}}
                />
            </Header>
            <Content style={{padding: '32px'}}>
                <Outlet/>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                <Text type='secondary'>
                    Booking hotels © 2026
                </Text>
            </Footer>
        </AntLayout>
    );
};