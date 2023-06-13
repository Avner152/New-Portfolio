import axios from "axios";
import { useEffect, useState } from "react";
import { Trash2Fill } from "react-bootstrap-icons";

import {
  Form,
  Button,
  InputGroup,
  Card,
  Container,
  Row,
  Col,
  Accordion,
} from "react-bootstrap";
import Item from "../Item";

export default function Edit(props) {
  const [posted, setPosted] = useState(0);
  const [product, setProduct] = useState(undefined);
  const [shipment, setShipment] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [prizes, setPrizes] = useState(undefined);

  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/products").then((res) => {
      setData(res.data);
      // console.log(data);
    });
  }, [posted]);

  function empty() {
    // setPrizes("");
    // setProduct("");
    // setShipment("");
    // setUsername("");
  }

  const postHandler = async () => {
    try {
      axios
        .post("http://localhost:3001/products", {
          product: product,
          shipments: shipment,
          username: username,
          prizes: prizes,
        })
        .then((res) => {
          setPosted(posted + 1);
          // empty();
        })
        .catch((err) => console.log("err: ", err));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div style={{ minHeight: "50vh" }}>
      <Container>
        {data ? (
          <>
            {data.map((d, k) => (
              <Item product={d} key={k} />
            ))}
          </>
        ) : null}
      </Container>
      <br />
      <Container>
        <Accordion>
          <Accordion.Header>Edit</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Row>
                <Col>
                  <InputGroup>
                    <Col md={2}>
                      <Form.Label>Product: </Form.Label>
                    </Col>
                    <Col md={10}>
                      <Form.Control
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        placeholder="Insert Your product"
                      />
                    </Col>
                  </InputGroup>
                  <InputGroup>
                    <Col md={2}>
                      <Form.Label>Shipments: </Form.Label>
                    </Col>
                    <Col md={10}>
                      <Form.Control
                        value={shipment}
                        onChange={(e) => setShipment(e.target.value)}
                        placeholder="Insert Shipment"
                      />
                    </Col>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                    <Col md={2}>
                      <Form.Label>Username: </Form.Label>
                    </Col>
                    <Form.Control
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Insert Your product"
                    />
                  </InputGroup>
                  <InputGroup>
                    <Col md={2}>
                      <Form.Label>Prizes: </Form.Label>
                    </Col>
                    <Col md={10}>
                      <Form.Control
                        value={prizes}
                        onChange={(e) => setPrizes(e.target.value)}
                        placeholder="Insert Your product"
                      />
                    </Col>
                  </InputGroup>
                </Col>
              </Row>

              <Button className="post-btn" onClick={postHandler}>
                Post!
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion>
      </Container>
    </div>
  );
}
