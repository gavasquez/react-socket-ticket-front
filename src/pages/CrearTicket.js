import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd'
import React, { useContext, useState } from 'react'
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

export const CrearTicket = () => {

  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);

  useHideMenu(true);

  const nuevoTicket = () => {
    //* al emitir se puede enviar la data y obtener lo que responde el socket
    socket.emit('solicitar-ticket', null, (ticket) => {
      setTicket(ticket);
    });
  }

  return (
    <>
      <Row>
        <Col span={14} offset={6} align="center">
          <Title level={3}>
            Presione el boton para un nuevo ticket
          </Title>
          <Button type='primary' shape='round' size='large' onClick={nuevoTicket}>
            <DownloadOutlined />
            Nuevo Ticket
          </Button>
        </Col>
      </Row>
      {
        ticket &&
        (<Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6} align="center">
            <Text level={2}>Su número </Text><br />
            <Text type='success' style={{ fontSize: 55 }}>{ticket.numero}</Text>
          </Col>
        </Row>)
      }

    </>
  )
}
