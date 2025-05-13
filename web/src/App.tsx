import React, {useEffect, useState} from 'react';
import './Styles/App.css';
import {ConfigProvider, Layout, Menu, MenuProps, Modal, Switch, theme, Typography} from "antd";
import {SerialManager} from "./Utilities/SerialManager";
import Sider from "antd/es/layout/Sider";
import { SettingOutlined, ControlOutlined, SunOutlined, MoonOutlined, FullscreenOutlined, CodeOutlined, GithubOutlined } from '@ant-design/icons';
import {Content, Header} from "antd/es/layout/layout";

const { Title } = Typography;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('control');
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored === null ? true : stored === 'true';
  });
  const [serialManager] = useState(() => new SerialManager());
  const [serialLog, setSerialLog] = useState<string[]>(['[INFO] System ready.']);
  const [serialSupported, setSerialSupported] = useState(true);
  const [modal, contextHolder] = Modal.useModal();
  
  // Web Serial Compatibility Check
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!("serial" in navigator)) {
      setSerialSupported(false);
      modal.error({
        title: "Your browser is incompatible.",
        content: "This application requires Web Serial API. Try using Chrome, Edge, or Opera.",
        okButtonProps: { style: { display: 'none' } },
        closable: false,
        maskClosable: false,
        keyboard: false,
      });
    }
  }, []);
  
  // Toggle Dark Mode
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', String(checked));
  };
  
  // Menu Items
  const menuItems: MenuProps['items'] = [
    {
      key: 'config',
      icon: <ControlOutlined />,
      label: 'Configuration',
    },
    {
      key: 'calibration',
      icon: <SettingOutlined />,
      label: 'Calibration',
    },
    {
      key: 'arduino',
      icon: <CodeOutlined />,
      label: 'Arduino Sketch',
    },
    {
      key: 'github',
      icon: <GithubOutlined />,
      label: (
        <a href="https://github.com/nicki419/Open-N-Step" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      ),
    }
  ];
  
  
  return (
    <ConfigProvider theme={{ algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      {contextHolder}
      
      <Layout className="App">
        <Sider theme={darkMode ? 'dark' : 'light'} collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          {/* Dark Mode Toggle */}
          <div style={{ padding: '16px', color: darkMode ? 'white' : 'black', display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
            { !collapsed && <strong>Navigation</strong> }
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              style={{ width: 40 }}
            />
          </div>
  
          {/* Menu */}
          <Menu
            theme={darkMode ? 'dark' : 'light'}
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => {
              if (e.key === 'github') {
                window.open('https://github.com/nicki419/Open-N-Step', '_blank');
                return; 
              }
              setSelectedKey(e.key);
            }}
            items={menuItems}
          />
        </Sider>
  
        <Layout>
          {/* Header */}
          <Header
            style={{
              background: darkMode ? 'black' : 'white',
              padding: 0,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 14,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Title level={3} style={{ marginTop: -15, marginBottom: 0 }}>
              Open N-Step
            </Title>
          </Header>
  
          <Content style={{ margin: '16px' }}>
            {selectedKey === 'control' && <></>}
            {selectedKey === 'calibration' && <></>}
            {selectedKey === 'arduino' && <></>}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
