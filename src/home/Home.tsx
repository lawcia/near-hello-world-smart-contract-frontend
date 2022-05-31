import { useState } from "react";

import {
  Typography,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";

import { useHelloWorld } from "../near/useHelloWorld";

import "./Home.css";
import { Greeting } from "../greeting/Greeting";

const Home = () => {
  const { greeting, getGreeting, isError, isLoading } = useHelloWorld();

  const [name, setName] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    getGreeting(name);
  };

  return (
    <Paper className="home-paper">
      <Typography variant="h1">Hello World</Typography>
      <Typography variant="h2">A SMART contract built on NEAR ❤️.</Typography>
      <form className="home-form" onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            aria-describedby="name-helper-text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormHelperText id="name-helper-text">
            Enter your name to receive a greeting from the contract
          </FormHelperText>
        </FormControl>
        <div className="home-button">
          <Button type="submit" variant="contained">
            Call Contract
          </Button>
        </div>
      </form>
      <div className="home-greeting">
        <Greeting isLoading={isLoading} isError={isError} greeting={greeting} />
      </div>
    </Paper>
  );
};

export { Home };
