import {paygate_checksum} from "../common_utils";

export default async function query_paygate(a_pay_request_id,a_reference) {
    // API Data
    const encryptionKey = process.env.NEXT_PUBLIC_PAYGATE_SECRET;
    const merchantID = process.env.NEXT_PUBLIC_PAYGATE_MERCHANT;

    try {
        const payload = {
            'PAYGATE_ID': merchantID,
            'PAY_REQUEST_ID': a_pay_request_id,
            'REFERENCE': a_reference,
            'CHECKSUM': ''
        };

        // Compile call
        const url = "https://secure.paygate.co.za/payweb3/query.trans";
    
        const checksum = paygate_checksum(payload,encryptionKey);
        payload['CHECKSUM'] = checksum;
    
        const formBody = new URLSearchParams(payload);
    
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody.toString()
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        return await response.text();
      } catch (error) {
        return { error: error.message };
      }
}