import axios from 'axios';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import ironConfig from '../../../utils/iron-config';

export default withIronSessionApiRoute(ordersList, ironConfig);

async function ordersList(req: NextApiRequest, res: NextApiResponse) {
    const account = req.session.account;
    const { id } = req.query;

    if (!account) {
        return res.status(401).json({ message: 'Unauthenticated.' });
    }

    try {
        const { data } = await axios.get(
            `${process.env.API_HOST}/orders/${id}`,
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
