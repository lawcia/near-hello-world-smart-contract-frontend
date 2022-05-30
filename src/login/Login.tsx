import { FC } from "react";

import { Typography, Paper, Button } from "@mui/material";

import { useHelloWorld } from "../near/useHelloWorld";

import "./Login.css";

const Login: FC = () => {
  const { login } = useHelloWorld();
  return (
    <Paper className="login">
      <Typography className="login-heading-1" variant="h1">
        This Application interacts with the NEAR blockchain.
      </Typography>
      <Typography className="login-heading-2" variant="h2">
        Please login to continue.
      </Typography>
      <Button className="login-button" variant="contained" onClick={login}>
        Login
      </Button>
    </Paper>
  );
};

export { Login };
