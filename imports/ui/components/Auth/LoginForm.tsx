import { Meteor } from 'meteor/meteor';
import React, { useState, FormEvent } from 'react';
import LoginWithGitHub from './LoginWithGitHub';
import { Box, Button, Input, InputLabel } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
  };

  return (
    <Box className="display-center">
      <Box className="box">
        <form onSubmit={submit} className="form">
          <LoginWithGitHub />

          <InputLabel sx={{ color: "black" }} htmlFor='username'>
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

          <InputLabel sx={{ color: "black" }} htmlFor='password'>
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

          <Button type='submit' variant='contained'>
            Log In
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default LoginForm;