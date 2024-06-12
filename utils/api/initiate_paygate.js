import {paygate_checksum,generateReference} from '../common_utils';
import Cookies from 'js-cookie';

export default async function initiate_paygate() {
  // API Data
  const encryptionKey = process.env.NEXT_PUBLIC_PAYGATE_SECRET;
  const merchantID = process.env.NEXT_PUBLIC_PAYGATE_MERCHANT;

  // Create the data object
  const data = {
      PAYGATE_ID: merchantID,
      REFERENCE: generateReference(),
      AMOUNT: '3299',
      CURRENCY: 'ZAR',
      RETURN_URL: `https://${process.env.NEXT_PUBLIC_HOST}`,
      TRANSACTION_DATE: new Date().toISOString().slice(0, 19).replace('T', ' '),
      LOCALE: 'en-za',
      COUNTRY: 'ZAF',
      EMAIL: 'customer@paygate.co.za'
  };

  // Create checksum
  const checksum = paygate_checksum(data,encryptionKey);

  // Add checksum to the data
  data.CHECKSUM = checksum;

  // Convert data to URL-encoded string
  const fieldsString = new URLSearchParams(data).toString();

  // Define the request options
  const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Referer': window.location.hostname
      },
      body: fieldsString
  };

  try {
    // Send the POST request
    const res = await fetch('https://secure.paygate.co.za/payweb3/initiate.trans', requestOptions);
    if (res.ok) {
        const response = await res.text();
        Cookies.set('transactionData', JSON.stringify({
            "portal": "paygate",
            "transactionData": response
        }), { expires: 1 })

        return response;
    }
  } catch (error) {
      return { "Error": "An error occurred during the request" };
  }
}