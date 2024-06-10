import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const transactionData = req.body;

    /*
      Note: 
        Using cookies to store sensitive data is not advised. As this is a static site, the choice was
        made just for showcasing. Making use of serverSideProps would be an example of a proper way
        to handle this data.
    */

    const dataToStore = typeof transactionData === 'string' ? transactionData : JSON.stringify(transactionData);
    const serialized = serialize('transactionData', dataToStore, {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
    });

    res.setHeader('Set-Cookie', serialized);
    res.redirect(307, '/');
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export function getTransactionData() {
  return transactionData;
}
