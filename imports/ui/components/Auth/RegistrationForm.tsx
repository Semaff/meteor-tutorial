import * as React from 'react';
import { Box, Button, Input, InputLabel } from "@mui/material";
import { Accounts } from "meteor/accounts-base";
import { FormEvent, useState } from "react";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Accounts.createUser({
      username,
      password
    });
  };

  return (
    <Box className="box">
      <form onSubmit={submit} className="form">
        <InputLabel sx={{ color: "black" }} htmlFor="username">
          Username
        </InputLabel>

        <Input
          type="text"
          placeholder="Username"
          id="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <InputLabel sx={{ color: "black" }} htmlFor="password">
          Password
        </InputLabel>

        <Input
          type="password"
          placeholder="******"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default RegistrationForm;
