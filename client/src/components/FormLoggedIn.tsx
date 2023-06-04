import React from 'react';

import { Stack, Typography, Button } from "@mui/material";

export type FormLoggedInProps = {
    formDirection: "row" | "row-reverse" | "column" | "column-reverse",
    currentUser?: string,
    onShareVideoClick?: () => void,
    onLogoutClick?: () => void
}

export const FormLoggedIn = ({ formDirection, currentUser, onShareVideoClick, onLogoutClick }: FormLoggedInProps) =>
{
    return <Stack spacing={2} direction={formDirection} style={{ margin: '1rem' }}>
        <Typography
            variant="h6"
            noWrap
            sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
        >
            Welcome, {currentUser}
        </Typography>
        <Button color='success' type='button' href="/share" variant='contained' onClick={onShareVideoClick}>
            Share Video
        </Button>
        <Button color='success' type='button' variant='contained' onClick={onLogoutClick}>
            Logout
        </Button>
    </Stack>;
}