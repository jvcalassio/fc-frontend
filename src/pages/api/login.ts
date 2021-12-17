import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import ironConfig from '../../utils/iron-config';
import { Account } from '../../utils/models';

export default withIronSessionApiRoute(login, ironConfig);

async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { token } = req.body;
        try {
            const { data }: { data: Account } = await axios.get(
                `${process.env.API_HOST}/accounts/${token}`,
            );
            req.session.account = data;

            await req.session.save();
            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            res.status(401).json({ message: 'Unauthenticated' });
        }
    }
}
