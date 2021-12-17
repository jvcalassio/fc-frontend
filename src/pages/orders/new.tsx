import { forwardRef, useEffect, useState } from 'react';
import {
    AppBar,
    Box,
    Button,
    Dialog,
    IconButton,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
    Slide,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';
import { CreateOrderDto } from '../../utils/models';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const GenerateYears = (): number[] => {
    const current: number = new Date().getFullYear();
    const ret: number[] = [];

    for (let year = current; year < current + 15; year++) {
        ret.push(year);
    }

    return ret;
};

const NewOrderPage = ({
    open,
    handleClose,
}: {
    open: boolean;
    handleClose: () => void;
}) => {
    const [credit_card_exp_month, setCreditCardExpMonth] = useState<string>('');
    const [credit_card_exp_year, setCreditCardExpYear] = useState<string>('');
    const [credit_card_name, setCreditCardName] = useState<string>('');
    const [amount, setAmount] = useState<string>('');

    useEffect(() => {
        const replaced = amount.replace(/[^0-9.]*/g, '');
        setAmount(replaced);
    }, [amount]);

    const [credit_card_number, setCreditCardNumber] = useState<string>('');

    useEffect(() => {
        const replaced = credit_card_number.replace(/[^0-9]*/g, '');
        setCreditCardNumber(replaced);
    }, [credit_card_number]);

    const handleSave = async () => {
        const data: CreateOrderDto = {
            amount: +amount,
            credit_card_number,
            credit_card_name,
            credit_card_exp_month: +credit_card_exp_month,
            credit_card_exp_year: +credit_card_exp_year,
        };

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_HOST}/orders`,
                data,
            );
            handleClose();
        } catch (e) {
            console.error(e);
            alert('Erro ao adicionar ordem de pagamento');
        }
    };

    const years = GenerateYears();

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="fechar"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                    >
                        Adicionar nova ordem
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="form"
                onSubmit={handleSave}
                sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 1,
                    maxWidth: 400,
                }}
            >
                <TextField
                    id="amount"
                    label="Valor"
                    margin="dense"
                    required
                    autoFocus
                    fullWidth
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                ></TextField>
                <TextField
                    id="credit_card_number"
                    label="Número do cartão de crédito"
                    margin="dense"
                    required
                    fullWidth
                    value={credit_card_number}
                    inputProps={{ maxlength: 19 }}
                    onChange={(e) => setCreditCardNumber(e.target.value)}
                ></TextField>
                <TextField
                    id="credit_card_name"
                    label="Nome no cartão de crédito"
                    margin="dense"
                    required
                    fullWidth
                    value={credit_card_name}
                    onChange={(e) => setCreditCardName(e.target.value)}
                ></TextField>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <FormControl
                        margin="dense"
                        sx={{ marginRight: 0.8 }}
                        fullWidth
                    >
                        <InputLabel id="credit_card_exp_month_label">
                            Mês
                        </InputLabel>
                        <Select
                            id="credit_card_exp_month"
                            label="Mês"
                            labelId="credit_card_exp_month_label"
                            required
                            value={credit_card_exp_month}
                            onChange={(e) =>
                                setCreditCardExpMonth(e.target.value)
                            }
                            MenuProps={{
                                PaperProps: { style: { maxHeight: 200 } },
                            }}
                        >
                            {Array.from(new Array(12).keys()).map(function (
                                month: number,
                                key: number,
                            ) {
                                return (
                                    <MenuItem key={key} value={month + 1}>
                                        {month + 1}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl
                        margin="dense"
                        sx={{ marginLeft: 0.8 }}
                        fullWidth
                    >
                        <InputLabel id="credit_card_exp_year_label">
                            Ano
                        </InputLabel>
                        <Select
                            id="credit_card_exp_year"
                            label="Ano"
                            labelId="credit_card_exp_year_label"
                            required
                            value={credit_card_exp_year}
                            onChange={(e) =>
                                setCreditCardExpYear(e.target.value)
                            }
                            MenuProps={{
                                PaperProps: { style: { maxHeight: 200 } },
                            }}
                        >
                            {years.map(function (year: number, key: number) {
                                return (
                                    <MenuItem key={key} value={year}>
                                        {year}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mt: 1 }}
                >
                    Salvar
                </Button>
            </Box>
        </Dialog>
    );
};

export default NewOrderPage;
