import * as React from 'react';
import { Button, Typography, Toolbar, Box, AppBar } from "@mui/material";
import { Meteor } from "meteor/meteor";

interface NavbarProps {
  user: Meteor.User | null,
  pendingTasksTitle: string
}

const Navbar = ({ user, pendingTasksTitle }: NavbarProps) => {
  const logout = () => Meteor.logout();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            📝️ ToDo List
            {pendingTasksTitle}
          </Typography>
          <Button color="inherit" onClick={logout}>
            {user && (
              `${user.username || (user.profile as unknown as any)?.name} - Logout 🚪`
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;