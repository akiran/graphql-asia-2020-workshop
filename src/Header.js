import React from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button
} from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import gql from "graphql-tag";

const ME_QUERY = gql`
  query productsQuery {
    me {
      id
      firstName
    }
  }
`;

export default function Header() {
  const { data } = useQuery(ME_QUERY);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link className="navbar-brand" to="/">
          reactstrap
        </Link>
        <Collapse isOpen={true} navbar>
          <Nav className="mr-md-3" navbar>
            <NavItem>
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/orders">
                Orders
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
        {data && data.me ? (
          <NavbarText>{data.me.firstName}</NavbarText>
        ) : (
          <Link className="btn btn-outline-primary" to="/login">
            Login
          </Link>
        )}
      </Navbar>
    </div>
  );
}
