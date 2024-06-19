import { Tabs, TabsProps } from 'antd';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems: TabsProps['items'] = [
    { label: 'Tab 1', children: 'Content of Tab 1', key: '/imagetofont' },
    { label: 'Tab 2', children: 'Content of Tab 2', key: '/child1' },
    {
        label: 'Tab 3',
        children: 'Content of Tab 3',
        key: '/three',
        closable: false,
    },
];

const TopTabs: React.FC = () => {
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
        navigate(newActiveKey);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({ label: 'New Tab', children: 'Content of new Tab', key: '6' });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    return (
        <Tabs
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
            items={items}
        />

    );
};

export default TopTabs;