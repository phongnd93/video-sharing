import React, { useState } from 'react';
import { Stack, Input, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, FilledInput } from "@mui/material";
import { UserModel } from "../models/UserModel";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export type FormJoinProps = {
    formDirection: "row" | "row-reverse" | "column" | "column-reverse",
    onJoinClick?: (value: UserModel) => void
};

export const FormJoin = ({ onJoinClick, formDirection }: FormJoinProps) =>
{
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
    {
        event.preventDefault();
    };

    const handleJoinClick = () => { onJoinClick && onJoinClick({ email: email, password: password }); }

    return <Stack spacing={2} direction={formDirection} style={{ margin: '1rem' }}>
        <FormControl size='small' variant="standard">
            <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
            <Input
                id="standard-adornment-email"
                type='text'
                onChange={(e) => { setEmail(e.target.value); }}
            />
        </FormControl>
        <FormControl variant="standard" size='small'>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                onChange={(e) => { setPassword(e.target.value || ''); }}
            />
        </FormControl>
        <Button color='success' type='button' variant='contained' onClick={handleJoinClick}>
            Login/Register
        </Button>
    </Stack>
};