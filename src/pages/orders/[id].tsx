import { GetStaticPaths, GetStaticProps } from 'next';
import {
    Typography,
    Card,
    CardHeader,
    CardContent,
    Box,
    Grid,
} from '@mui/material';
import axios from 'axios';
import useSWR from 'swr';
import { OrderStatus, OrderStatusTranslate } from '../../utils/models';
import Router, { useRouter } from 'next/router';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const OrdersShowPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_HOST}/orders/${id}`,
        fetcher,
        {
            onError: (error) => {
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                ) {
                    Router.push('/login');
                }
            },
        },
    );

    return data ? (
        <div style={{ height: 500, width: '100%' }}>
            <Grid container>
                <Grid item>
                    <Card>
                        <CardHeader
                            title="Ordem"
                            subheader={data.id}
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{ align: 'center' }}
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.grey[700],
                            }}
                        />
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    mb: 2,
                                }}
                            >
                                <Typography
                                    component="h2"
                                    variant="h4"
                                    color="text.primary"
                                >
                                    R$ {data.amount}
                                </Typography>
                                <Typography component="h4" variant="h6">
                                    {
                                        OrderStatusTranslate[
                                            data.status as OrderStatus
                                        ]
                                    }
                                </Typography>
                            </Box>
                            <ul style={{ listStyle: 'none' }}>
                                <Typography component="li" variant="subtitle1">
                                    {data.credit_card_number}
                                </Typography>
                                <Typography component="li" variant="subtitle1">
                                    {data.credit_card_name}
                                </Typography>
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    ) : null;
};

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {},
        revalidate: 20,
    };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default OrdersShowPage;
