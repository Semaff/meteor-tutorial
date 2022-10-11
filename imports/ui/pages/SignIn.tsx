import { Box } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import { RouteNames } from "../router/routes";

const SignInPage = () => {
  return (
    <Box className="display-center">
      <LoginForm />
      <Link to={RouteNames.SIGNUP} className="auth__link">
        Create an account..
      </Link>
    </Box>
  );
};

export default SignInPage;
