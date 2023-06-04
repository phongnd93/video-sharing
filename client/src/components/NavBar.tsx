import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import { FormJoin } from './FormJoin';
import { UserModel } from '../models/UserModel';
import { Stack, Button } from '@mui/material';
import { FormLoggedIn } from './FormLoggedIn';

export type NavBarProps = {
    currentUser?: string,
    onToggleDrawer?: () => void,
    onJoinClick?: (user: UserModel) => void,
    onShareVideoClick?: () => void,
    onLogoutClick?: () => void
};

const NavBar = ({ currentUser, onToggleDrawer, onJoinClick, onShareVideoClick, onLogoutClick }: NavBarProps) =>
{
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, alignItems: 'center' }}>
                        <HomeIcon sx={{ mr: 1, fontSize: '3rem' }} />
                        <Typography
                            variant="h4"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            FUNNY MOVIES
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        {(currentUser !== undefined && currentUser?.length > 0) ? (
                            <FormLoggedIn currentUser={currentUser} formDirection='row' onShareVideoClick={onShareVideoClick} onLogoutClick={onLogoutClick} />
                        ) : (<FormJoin formDirection='row' onJoinClick={onJoinClick} />)}
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'flex-start' }}>
                            <HomeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontSize: '3rem' }} />
                            <Typography
                                variant="h4"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                FUNNY MOVIES
                            </Typography>
                        </Box>

                        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={onToggleDrawer} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;
