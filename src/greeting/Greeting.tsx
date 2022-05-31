import { FC } from "react";

import { CircularProgress, Typography } from "@mui/material";

import "./Greeting.css";

interface GreetingProps {
  isLoading: boolean;
  isError: boolean;
  greeting: string;
}

const Greeting: FC<GreetingProps> = ({
  isLoading,
  isError,
  greeting = "No Greeting Found",
}) => {
  if (isLoading) {
    return (
      <div className="progress-wrapper">
        <Typography variant="body1">Loading</Typography>
        <CircularProgress
          className="progress"
          style={{ width: "1rem", height: "1rem" }}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <Typography color="red" variant="body1">
        Something went wrong!
      </Typography>
    );
  }

  if (greeting) {
    return <Typography variant="body1">👋 {greeting}</Typography>;
  }

  return null;
};

export { Greeting };
