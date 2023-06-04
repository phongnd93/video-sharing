import React, { useContext } from 'react';

import './App.css';
import NavBar from './components/NavBar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Share from './pages/Share';
import { AppContext, AppContextProps } from './AppProvider';
import { Alert, Box, Container, Snackbar, Stack, SwipeableDrawer, Typography } from '@mui/material';
import { useState } from 'react';
import { FormJoin } from './components/FormJoin';
import { UserModel } from './models/UserModel';
import { FormLoggedIn } from './components/FormLoggedIn';
import { ProtectedRoute } from './ProtectedRoute';
import { VideoModel } from './models/VideoModel';

function App()
{
  const { currentUser, events, removeEvent, join, logout } = useContext<AppContextProps>(AppContext);
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

  const handleCloseSnakeBar = (v: VideoModel) =>
  {
    removeEvent && removeEvent(v);
  };

  const handleShareVideoClick = () =>
  {

  }

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
      {events !== undefined && events.length > 0 && events.map((e: VideoModel) => (
        <Snackbar key={e.id} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={(events?.length > 0 && events.findIndex(v => v.id === e.id) > -1)} autoHideDuration={6000} onClose={() => { handleCloseSnakeBar(e); }}>
          <Alert onClose={() => { handleCloseSnakeBar(e); }} severity="success" sx={{ width: '100%' }}>
            <Stack direction={'column'}>
              <Typography component={"h6"}>{`${e.sharedBy} has just shared new video`}</Typography>
              <Typography component={"h5"}>{e.title}</Typography>
            </Stack>
          </Alert>
        </Snackbar>
      ))}
    </Container>
  );
}

export default App;
