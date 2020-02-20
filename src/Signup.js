import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Alert, Form, FormGroup, Label, Input } from "reactstrap";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { ME_QUERY } from "./queries";

const SINGUP_MUTATION = gql`
  mutation signupMutation($input: SignupInput!) {
    signup(input: $input)
  }
`;

export default function Signup() {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error: loginError }] = useMutation(SINGUP_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
    onCompleted: () => history.push("/"),
    onError: () => null
  });

  function signupHandler(e) {
    e.preventDefault();
    login({ variables: { input: { firstName, lastName, email, password } } });
  }

  return (
    <div>
      <div>
        <Form onSubmit={signupHandler}>
          <FormGroup>
            <Label for="exampleEmail">First Name</Label>
            <Input
              type="firstName"
              name="firstName"
              id="exampleFirstName"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Last Name</Label>
            <Input
              type="lastName"
              name="lastName"
              id="exampleLastName"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button color="primary" type="submit">
            Signup
          </Button>
          {loginError ? (
            <Alert color="danger" className="my-2">
              {loginError.message}
            </Alert>
          ) : null}
        </Form>

        <div>
          Don't have an account ?{" "}
          <Link className="btn btn-link lead" to="signup">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
