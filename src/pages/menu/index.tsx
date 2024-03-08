import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}




const LeftMenu: React.FC = () => {
    const navigate = useNavigate();

    const items: MenuItem[] = [
        getItem('Home', '/', <PieChartOutlined />),
        getItem('Image to font', '/imagetofont', <DesktopOutlined />),
        getItem('File Manage', '/filemanage', <ContainerOutlined />),

        getItem('Others', 'sub1', <MailOutlined />, [
            getItem('Test Three', '/three'),
            getItem('Option 6', '6'),
            getItem('Option 7', '7'),
            getItem('Option 8', '8'),
        ]),

        getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
            getItem('Option 9', '9'),
            getItem('Option 10', '10'),

            getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
        ]),
    ];
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const goToPage = ({ item, key, keyPath, domEvent }) => {
        navigate(key)

    }

    return (
        <div >

            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
                onClick={goToPage}
            />
            <Button type="primary" onClick={toggleCollapsed} >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
        </div>
    );
}

export default LeftMenu