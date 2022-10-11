import * as React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import RegistrationForm from "../components/Auth/RegistrationForm";
import { RouteNames } from "../router/routes";

const SignUpPage = () => {
  return (
    <Box className="display-center">
      <RegistrationForm />
      <Link to={RouteNames.SIGNIN} className="auth__link">
        Already have an account? Sign In.
      </Link>
    </Box>
  );
};

export default SignUpPage;
