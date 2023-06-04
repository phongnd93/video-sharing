import React, { useContext } from 'react';

import './App.css';
import NavBar from './components/NavBar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Share from './pages/Share';
import { AppContext, AppContextProps } from './AppProvider';
import { Box, Container, SwipeableDrawer } from '@mui/material';
import { useState } from 'react';
import { FormJoin } from './components/FormJoin';
import { UserModel } from './models/UserModel';
import { FormLoggedIn } from './components/FormLoggedIn';
import { ProtectedRoute } from './ProtectedRoute';

function App()
{
  const { currentUser, join, logout } = useContext<AppContextProps>(AppContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/share",
      element: <ProtectedRoute>
        <Share />
      </ProtectedRoute>,
    },
  ]);

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleJoinClick = async (user: UserModel) =>
  {
    if (join)
    {
      await join(user);
    }
  }

  const handleShareVideoClick = () =>
  {

  };

  const handleLogout = () =>
  {
    if (logout)
    {
      logout();
    }
  };

  return (
    <Container maxWidth='xl'>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} height={'100vh'}>
        <NavBar
          currentUser={currentUser}
          onToggleDrawer={() => { setOpenDrawer(!openDrawer); }}
          onJoinClick={handleJoinClick}
          onLogoutClick={handleLogout}
        />

        <RouterProvider router={router} />
        <SwipeableDrawer
          anchor='right'
          open={openDrawer}
          onClose={(e) => { setOpenDrawer(false) }}
          onOpen={(e) => { setOpenDrawer(true) }}
          PaperProps={{
            sx: { width: '80%' }
          }}
        >
          {
            (currentUser !== undefined && currentUser.length > 0) ? <FormLoggedIn
              formDirection='column'
              currentUser={currentUser}
              onShareVideoClick={handleShareVideoClick}
              onLogoutClick={handleLogout}
            /> : <FormJoin formDirection='column' onJoinClick={handleJoinClick} />
          }
        </SwipeableDrawer>
      </Box>
    </Container>
  );
}

export default App;
