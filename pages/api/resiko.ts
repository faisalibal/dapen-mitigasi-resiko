import { baseURL } from '@/config/axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await baseURL.get('/nilaiResikoInherent?year=2023');
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500);
  }
};

export default handler;
