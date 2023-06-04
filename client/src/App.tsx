import React, { useContext } from 'react';

import './App.css';
import NavBar from './components/NavBar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Share from './pages/Share';
import { AppContext, AppContextProps } from './AppProvider';
import Login_Register from './pages/Login_Register';
import { SwipeableDrawer } from '@mui/material';
import { useState } from 'react';
import { FormJoin } from './components/FormJoin';
import { UserModel } from './models/UserModel';
import { FormLoggedIn } from './components/FormLoggedIn';

function App()
{
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/share",
      element: <Share />,
    },
    {
      path: "/join",
      element: <Login_Register />,
    },
  ]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const { currentUser, join, logout } = useContext<AppContextProps>(AppContext);

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
    <>
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
    </>
  );
}

export default App;
