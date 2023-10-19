import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Typography } from 'antd'
import React, { useContext, useState } from 'react'
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { Navigate, useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

export const Escritorio = () => {

  const { socket } = useContext(SocketContext);

  const [ticket, setTicket] = useState(null);

  useHideMenu(false);
  const navigate = useNavigate();

  const [usuario] = useState(getUsuarioStorage());

  const salir = () => {
    localStorage.clear();
    return navigate('/ingresar');
  }

  const siguienteTicket = () => {
    socket.emit('siguiente-ticket-trabajar', usuario, (ticket) => {
      setTicket(ticket);
    });
  }


  if (!usuario.agente || !usuario.escritorio) {
    localStorage.clear();
    return <Navigate to='/ingresar' />
  }

  return (
    <>
      <Row>
        <Col span={15}>
          <Title level={2}>{usuario.agente}</Title>
          <Text>Usted está trabajando en el escritorio: </Text>
          <Text type='success'>{usuario.escritorio}</Text>
        </Col>
        <Col span={1} align="right">
          <Button shape='round' type='primary' danger onClick={salir}>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />
      {
        ticket && (
          <Row>
            <Col>
              <Text>Esta Atendiendo el ticket número: </Text>
              <Text style={{ fontSize: 30 }} type='danger'>{ticket.numero}</Text>
            </Col>
          </Row>
        )
      }


      <Row>
        <Col offset={14} span={2} align='right'>
          <Button onClick={siguienteTicket} shape='round' type='primary'>
            <RightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  )
}
