import React from "react";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";

export default function Product({ product }) {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>
            <h1 className="display-5">{product.name}</h1>
          </CardTitle>
          <CardText>{product.description}</CardText>
          <CardText>${product.price}</CardText>
          <Button color="primary">Add to cart</Button>
        </CardBody>
      </Card>
    </div>
  );
}
