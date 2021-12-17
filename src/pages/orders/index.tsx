import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { Typography, Link as MuiLink, Button, Box } from '@mui/material';
import {
    DataGrid,
    GridColumns,
    GridRenderCellParams,
    GridValueFormatterParams,
} from '@mui/x-data-grid';
import { withIronSessionSsr } from 'iron-session/next';
import axios from 'axios';
import useSWR from 'swr';

import { Order, OrderStatus, OrderStatusTranslate } from '../../utils/models';
import ironConfig from '../../utils/iron-config';
import NewOrderPage from './new';
import { useState } from 'react';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface OrdersPageProps {
    orders?: Array<Order>;
}

const columns: GridColumns = [
    {
        field: 'id',
        headerName: 'ID',
        flex: 3,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <Link href={`/orders/${params.value}`} passHref>
                    <MuiLink>{params.value}</MuiLink>
                </Link>
            );
        },
    },
    {
        field: 'amount',
        headerName: 'Valor',
        flex: 1,
    },
    {
        field: 'credit_card_number',
        headerName: 'Num. Cartão Crédito',
        flex: 2,
    },
    {
        field: 'credit_card_name',
        headerName: 'Nome Cartão Crédito',
        flex: 2,
    },
    {
        field: 'status',
        headerName: 'Situação',
        flex: 1,
        valueFormatter: (params: GridValueFormatterParams) =>
            OrderStatusTranslate[params.value as OrderStatus],
    },
    {
        field: 'created_at',
        headerName: 'Realizado em',
        flex: 2,
        valueFormatter: (params: GridValueFormatterParams) => {
            const dt = new Date(params.value as string);
            return dt.toLocaleString();
        },
    },
];

const OrdersPage: NextPage<OrdersPageProps> = (props) => {
    const { data } = useSWR(
        `${process.env.NEXT_PUBLIC_API_HOST}/orders`,
        fetcher,
        {
            fallbackData: props.orders,
            refreshInterval: 2,
            refreshWhenOffline: false,
            onError: (error) => {
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {
                    Router.push('/login');
                }
            },
        },
    );

    const [newPageOpen, setNewPageOpen] = useState<boolean>(false);

    return (
        <div style={{ height: 500, width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mt: 1,
                    mb: 2,
                }}
            >
                <Typography component="h1" variant="h4">
                    Minhas ordens
                </Typography>
                <Button
                    type="button"
                    variant="contained"
                    onClick={() => setNewPageOpen(true)}
                >
                    Adicionar
                </Button>
            </Box>
            <DataGrid columns={columns} rows={data} disableSelectionOnClick />
            <NewOrderPage
                open={newPageOpen}
                handleClose={() => setNewPageOpen(false)}
            />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
    async (context) => {
        const account = context.req.session.account;

        if (!account) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        const { data }: { data: Order[] } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_HOST}/orders`,
            {
                headers: {
                    cookie: context.req.headers.cookie as string,
                },
            },
        );

        return {
            props: {
                orders: data,
            },
        };
    },
    ironConfig,
);

export default OrdersPage;
