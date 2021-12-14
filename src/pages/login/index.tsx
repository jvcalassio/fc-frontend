import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const LoginPage: NextPage = () => {
    const [token, changeToken] = useState('');
    const router = useRouter();

    async function onSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/login`, {
                token,
            });
            router.push('/orders');
        } catch (e) {
            console.error(e);
            alert('Erro no login!');
        }
    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                <TextField
                    id="token"
                    margin="normal"
                    required
                    fullWidth
                    label="Token da conta"
                    onChange={(e) => changeToken(e.target.value)}
                ></TextField>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default LoginPage;
