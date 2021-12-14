import { AppBar, Toolbar, Typography } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import theme from '../utils/theme';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <StoreIcon style={{ marginRight: theme.spacing(1) }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Fincycle
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
