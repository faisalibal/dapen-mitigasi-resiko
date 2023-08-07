import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const setJSESSIONIDCookie = (res: NextApiResponse, session: string) => {
  const cookieSerialized = serialize('JSESSIONID', session, {
    maxAge: 0, // Waktu kedaluwarsa cookie dalam detik (contoh: 1 jam)
    path: '/', // Path di mana cookie tersedia
    httpOnly: true, // Cookie hanya dapat diakses melalui HTTP (tidak melalui JavaScript)
  });

  console.log(cookieSerialized, '<<<<<<< cek');

  res.setHeader('Set-Cookie', cookieSerialized);
};

// Contoh penggunaan di Next.js API route
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Mendapatkan JSESSIONID dari suatu sumber (misalnya, hasil autentikasi)

  const jsessionid = '...'; // Isi dengan JSESSIONID yang diperoleh
  const { session } = req.query;

  setJSESSIONIDCookie(res, session as string);

  res.status(200).json({ name: 'oke' });

  // Lanjutkan penanganan permintaan API lainnya
  // ...
};

export default handler;
