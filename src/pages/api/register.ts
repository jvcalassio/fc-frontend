import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Account } from '../../utils/models';

async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { status, data }: { status: number; data: Account } =
                await axios.post(`${process.env.API_HOST}/accounts`, req.body);
            res.status(status).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default register;
