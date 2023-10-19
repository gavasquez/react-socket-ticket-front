import React, { useContext } from 'react'
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { Ingresar } from './Ingresar';
import { Escritorio } from './Escritorio';
import { Cola } from './Cola';
import { CrearTicket } from './CrearTicket';
import { UiContext } from '../context/UiContext';

const { Sider, Content } = Layout;

export const RouterPage = () => {

    const { ocultarMenu } = useContext(UiContext);

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{
            height: '98vh',
            background: '#fff',
        }}>
            <Sider
                collapsedWidth="0"
                breakpoint='md'
                hidden={ocultarMenu}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: <Link to='/ingresar'>Ingresar</Link>,
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: <Link to='/cola'>Cola de Ticket</Link>,
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: <Link to='/crear'>Crear Ticket</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer
                    }}
                >

                    <Routes>
                        <Route path='/ingresar' element={<Ingresar />}></Route>
                        <Route path='/cola' element={<Cola />}></Route>
                        <Route path='/crear' element={<CrearTicket />}></Route>
                        <Route path='/escritorio' element={<Escritorio />}></Route>
                        <Route path="*" element={<Navigate to="/ingresar" />} />
                    </Routes>

                </Content>
            </Layout>
        </Layout>
    )
}
