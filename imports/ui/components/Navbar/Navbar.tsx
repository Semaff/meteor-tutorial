import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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