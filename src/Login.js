import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Alert, Form, FormGroup, Label, Input } from "reactstrap";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { ME_QUERY } from "./queries";

const LOGIN_MUTATION = gql`
  mutation loginMutation($input: LoginInput!) {
    login(input: $input)
  }
`;

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error: loginError }] = useMutation(LOGIN_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
    onCompleted: () => history.push("/"),
    onError: () => null
  });

  function loginHandler(e) {
    e.preventDefault();
    console.log("login");
    login({ variables: { input: { email, password } } });
  }

  return (
    <div>
      <div>
        <Form onSubmit={loginHandler}>
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
            Login
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
