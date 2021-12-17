import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { Account } from '../../utils/models';

const RegisterPage: NextPage = () => {
    const [name, changeName] = useState<string>('');
    const [token, changeToken] = useState<string>('');
    const router = useRouter();

    async function onSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const { data }: { data: Account } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_HOST}/register`,
                {
                    name,
                },
            );
            changeToken(data.token);
        } catch (e) {
            console.error(e);
            alert('Erro ao realizar o cadastro.');
        }
    }

    function redirectLogin() {
        router.push('/login');
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
                Cadastro
            </Typography>
            <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                <TextField
                    id="name"
                    margin="normal"
                    required
                    fullWidth
                    label="Nome"
                    onChange={(e) => changeName(e.target.value)}
                ></TextField>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Cadastrar
                </Button>
            </Box>
            <Dialog open={token !== ''} onClose={redirectLogin}>
                <DialogTitle>Cadastro realizado</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Seu token é: <b>{token}</b>
                    </DialogContentText>
                    <DialogContentText>
                        Guarde seu token para conseguir realizar login no
                        sistema.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={redirectLogin}>Ir para o Login</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default RegisterPage;
