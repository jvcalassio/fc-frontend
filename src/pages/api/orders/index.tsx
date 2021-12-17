import axios from 'axios';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import ironConfig from '../../../utils/iron-config';
import { CreateOrderDto, Order } from '../../../utils/models';

export default withIronSessionApiRoute(ordersList, ironConfig);

async function ordersList(req: NextApiRequest, res: NextApiResponse) {
    const account = req.session.account;

    if (!account) {
        return res.status(401).json({ message: 'Unauthenticated.' });
    }

    if (req.method === 'POST') {
        // add token e enviar nova ordem de pagamento
        try {
            const send_data: CreateOrderDto = req.body;
            await axios.post(`${process.env.API_HOST}/orders`, send_data, {
                headers: {
                    'x-api-token': account.token,
                },
            });
            res.status(201).json({ message: 'Created' });
        } catch (e) {
            console.error(e);
            if (axios.isAxiosError(e)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                res.status(e.response!.status).json(e.response?.data);
            } else {
                res.status(500).json({ message: 'Ocorreu um erro interno.' });
            }
        }
    } else if (req.method === 'GET') {
        // recuperar lista de ordens
        try {
            const { data }: { data: Order[] } = await axios.get(
                `${process.env.API_HOST}/orders`,
                {
                    headers: {
                        'x-api-token': account.token,
                    },
                },
            );
            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            if (axios.isAxiosError(e)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                res.status(e.response!.status).json(e.response?.data);
            } else {
                res.status(500).json({ message: 'Ocorreu um erro interno.' });
            }
        }
    }
}
