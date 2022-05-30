import React, { FC } from "react";

import {
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";

import { AccountCircle } from "@mui/icons-material";

import { useHelloWorld } from "../near/useHelloWorld";

import "./User.css"

const User: FC = () => {
  const { logout, getUser } = useHelloWorld();

  return (
    <div className="user">
      <Typography variant="caption">{getUser()}</Typography>
      <Tooltip className="home-logout" title="Logout">
        <IconButton onClick={logout}>
          <AccountCircle />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export { User };
