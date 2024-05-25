import CryptoJS from 'crypto-js';

export default async function initiate_paygate() {
  // Encryption key
  const encryptionKey = 'secret';
  const merchantID = '10011072130';

  // Create the data object
  const data = {
      PAYGATE_ID: merchantID,
      REFERENCE: 'pgtest_123456789',
      AMOUNT: '3299',
      CURRENCY: 'ZAR',
      RETURN_URL: `https://${process.env.HOST}/`,
      TRANSACTION_DATE: new Date().toISOString().slice(0, 19).replace('T', ' '),
      LOCALE: 'en-za',
      COUNTRY: 'ZAF',
      EMAIL: 'customer@paygate.co.za'
  };

  // Create checksum
  const checksumString = Object.values(data).join('') + encryptionKey;
  const checksum = CryptoJS.MD5(checksumString).toString();

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
        return await res.text();
    }
  } catch (error) {
      return { "Error": "An error occurred during the request" };
  }
}