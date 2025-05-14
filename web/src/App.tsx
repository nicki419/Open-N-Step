import React, {useEffect, useState} from 'react';
import './Styles/App.css';
import {ConfigProvider, Layout, Menu, MenuProps, Modal, Switch, theme, Typography} from "antd";
import {SerialManager} from "./Utilities/SerialManager";
import Sider from "antd/es/layout/Sider";
import { SettingOutlined, ControlOutlined, SunOutlined, MoonOutlined, FullscreenOutlined, CodeOutlined, GithubOutlined } from '@ant-design/icons';
import {Content, Header} from "antd/es/layout/layout";
import { useDarkMode } from './Utilities/DarkModeContext';
import { useSerial } from './Utilities/SerialContext';
import CalibrationPage from './Pages/CalibrationPage';
import ConfigurationPage from "./Pages/ConfigurationPage";
import ArduinoPage from "./Pages/ArduinoPage";

const { Title } = Typography;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('calibration');
  const { darkMode, setDarkMode } = useDarkMode();
  const { serialManager, serialLog, setSerialLog, serialSupported } = useSerial();
  const [modal, contextHolder] = Modal.useModal();
  
  // Web Serial Compatibility Check
  useEffect(() => {
    if (!serialSupported) {
      modal.error({
        title: "Your browser is incompatible.",
        content: "This application requires Web Serial API. Try using Chrome, Edge, or Opera.",
        okButtonProps: { style: { display: 'none' } },
        closable: false,
        maskClosable: false,
        keyboard: false,
      });
    }
  }, [serialSupported]);
  
  // Toggle Dark Mode
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', String(checked));
  };
  
  // Menu Items
  const menuItems: MenuProps['items'] = [
    {
      key: 'calibration',
      icon: <SettingOutlined />,
      label: 'Calibration',
    },
    {
      key: 'config',
      icon: <ControlOutlined />,
      label: 'Configuration',
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
            {selectedKey === 'calibration' && <CalibrationPage />}
            {selectedKey === 'config' && <ConfigurationPage />}
            {selectedKey === 'arduino' && <ArduinoPage />}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
