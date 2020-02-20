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
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { ME_QUERY } from "./queries";

const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export default function Header() {
  const { data } = useQuery(ME_QUERY);
  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => (window.location.href = "/")
  });
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link className="navbar-brand" to="/">
          React Store
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
          <>
            <NavbarText>{data.me.firstName}</NavbarText>
            <Button onClick={logout} className="mx-4">
              Logout
            </Button>
          </>
        ) : (
          <Link className="btn btn-outline-primary" to="/login">
            Login
          </Link>
        )}
      </Navbar>
    </div>
  );
}
