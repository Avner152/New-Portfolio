import axios from "axios";
import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Trash2Fill } from "react-bootstrap-icons";

export default function Item(props) {
  const deleteProduct = async () => {
    const p = {
      id: props.product.id.toString(),
      product: props.product.product,
      shipments: props.product.shipments,
      username: props.product.username,
      prizes: props.product.prizes,
    };

    axios
      .delete("http://localhost:3001/products", { data: p })
      .then((res, req) => console.log("delete res: ", res))
      .catch((err) => console.log(err));
  };

  return (
    <Card>
      <Card.Header as={"h4"}>
        {props.product.id}){" "}
        <span style={{ fontSize: "1.15rem", textTransform: "capitalize" }}>
          {props.product.product}
        </span>
        <Trash2Fill onClick={deleteProduct} />
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>Shipments:</Col>
          <Col>{props.product.shipments}</Col>
        </Row>
        <Row>
          <Col>Prizes:</Col>
          <Col>{props.product.prizes}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
