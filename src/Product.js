import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

export default function Product({ product }) {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardText>{product.description}</CardText>
          <Button color="primary">Add to cart</Button>
        </CardBody>
      </Card>
    </div>
  );
}
