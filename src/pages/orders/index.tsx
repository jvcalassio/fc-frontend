import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { Typography, Link as MuiLink } from '@mui/material';
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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface OrdersPageProps {
    orders?: Array<Order>;
}

const columns: GridColumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 300,
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
        width: 100,
    },
    {
        field: 'credit_card_number',
        headerName: 'Num. Cartão Crédito',
        width: 200,
    },
    {
        field: 'credit_card_name',
        headerName: 'Nome Cartão Crédito',
        width: 200,
    },
    {
        field: 'status',
        headerName: 'Situação',
        width: 110,
        valueFormatter: (params: GridValueFormatterParams) =>
            OrderStatusTranslate[params.value as OrderStatus],
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

    return (
        <div style={{ height: 500, width: '100%' }}>
            <Typography component="h1" variant="h4">
                Minhas ordens
            </Typography>
            <DataGrid columns={columns} rows={data} disableSelectionOnClick />
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

        const { data } = await axios.get(
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
