import { Card, Col, Divider, List, Row, Tag, Typography } from "antd";
import { useHideMenu } from "../hooks/useHideMenu";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { getUltimos } from "../helpers/getUltimos";

const { Title, Text } = Typography;

export const Cola = () => {

  const { socket } = useContext(SocketContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    getUltimos().then(ultimos => setData(ultimos));
  }, []);


  useEffect(() => {
    socket.on('ticket-asignado', (tickets) => {
      setData(tickets);
    });
    return () => {
      socket.off('ticket-asignado');
    }
  }, [socket]);


  useHideMenu(true);

  return (
    <>
      <Title level={1}>Atendiendo al cliente</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={data.slice(0, 3)}
            renderItem={data => (
              <List.Item>
                <Card style={{ width: 300, marginTop: 16, }} actions={[<Tag color="volcano">{data.agente}</Tag>, <Tag color="magenta">Escritorio: {data.escritorio}</Tag>]}>
                  <Title>No. {data.numero}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider style={{
            color: 'black'
          }}>Historial</Divider>
          <List dataSource={data.slice(3)}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta title={`Ticket No. ${item.numero}`} description={
                  <>
                    <Text type="secondary">En el escritorio</Text>
                    <Tag color="magenta">{item.numero}</Tag>
                    <Text color="secondary">Agente: </Text>
                    <Tag color="volcano">{item.agente}</Tag>
                  </>
                } />
              </List.Item>
            )} />
        </Col>
      </Row>
    </>
  )
}
