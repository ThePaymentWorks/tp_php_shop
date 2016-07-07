function getResponseObject (resultCode) {

  // Create the responses object
  var responses = [];

  // Add responses
  responses.push({
    'code': '00',
    'responseCode': '00_success',
    'description': 'Successful – the transaction has processed and you may proceed with the sale.',
    'checkoutmessage': 'Success. Your purchase is complete.',
    'checkoutOptions': {
      'Ok': "rest()",
      'Keep Shopping': "reset()"
    }
  });

  responses.push({
    'code': '100',
    'responseCode': '100_3dsecure',
    'description': 'Successful – 3D secure verification needed.',
    'checkoutmessage': 'Pending - your bank requests you verify this purchase. Click Verify to open the bank verification page.',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Verify': "threeDSecure()"
    }
  });

  responses.push({
    'code': '101',
    'responseCode': '101_declined_bank',
    'description': 'A failed transaction specifically meaning: Declined by Bank – generally insufficient funds or incorrect expiry date.',
    'checkoutmessage': 'We\'re sorry but your bank has declined your transaction. Please confirm your card CVV and expiry date, then try again.',
    'checkoutOptions': {
      'Cancel': '"rest()"',
      'Review Detail': "highlight([cvv, expiryMonth, expiryYear])"
    }
  });

  responses.push({
    'code': '102',
    'responseCode': '102_declined_offline',
    'description': 'A failed transaction specifically meaning: Transaction Declined Pending Offline Authorisation..',
    'checkoutmessage': 'We\'re sorry but your bank has declined your transaction. Contact your bank at +3538787878 to find out why.',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Phone Bank': "rest()"
    }
  });

  responses.push({
    'code': '103',
    'responseCode': '103_card_stolen',
    'description': 'A failed transaction specifically meaning: Card reported lost or stolen.',
    'checkoutmessage': 'We\'re sorry but it looks like you\'re using a stolen card. We\'ve suspended your account pending further details.',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Contact Us': "contactUs()"
    }
  });

  responses.push({
    'code': '107',
    'responseCode': '107_fraud',
    'description': 'A failed transaction specifically meaning: Your fraud checks blocked the transaction.',
    'checkoutmessage': 'We\'re sorry, you seem to be a fraudster. Contact us if you wish to dispute this.',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Contact Us': "contactUs()"
    }
  });

  responses.push({
    'code': '600',
    'responseCode': '600_error',
    'description': 'Generic error 600',
    'checkoutmessage': 'Empty message',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Contact Us': "contactUs()"
    }
  });

  responses.push({
    'code': '601',
    'responseCode': '601_error',
    'description': 'Generic error 601',
    'checkoutmessage': '',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Contact Us': "contactUs()"
    }
  });

  responses.push({
    'code': '603',
    'responseCode': '603_error',
    'description': 'Generic error 603',
    'checkoutmessage': '',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Contact Us': "contactUs()"
    }
  });

  responses.push({
    'code': '666',
    'responseCode': '666_deactivated',
    'description': 'Account deactivated',
    'checkoutmessage': '',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Contact Us': "contactUs()"
     }
  });

  responses.push({
    'code': '200',
    'responseCode': '200_bank_comm',
    'description': 'A failed transaction specifically meaning: bank communication error.',
    'checkoutmessage': '',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Contact Us': "contactUs()"
    }
  });

  responses.push({
    'code': '205',
    'responseCode': '205_bank_comm',
    'description': 'A failed transaction specifically meaning: bank communication error.',
    'checkoutmessage': '',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Contact Us': "contactUs()"
    }
  });

  responses.push({
    'code': '501',
    'responseCode': '501_already_processed',
    'description': 'This transaction has already been processed.',
    'checkoutmessage': 'We\'re sorry, a technical issue has stopped your purchase from completing. Your card has not been charged. Re-try to complete the purchase or contact us to talk more about this problem.',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Retry': "retry()",
      'Contact Us': "contactUs()"
    }
  });

  responses.push({
    'code': '507',
    'responseCode': '507_currency',
    'description': 'Currency/card combination not allowed.',
    'checkoutmessage': 'We\'re sorry, that item is not available to buy in that currency. You can complete your purchase using one of our alternatives.',
    'checkoutOptions': {
      'Cancel': "rest()",
      'EUR': "currency(EUR)",
      'GBP': "currency(GBP)",
      'USD': "currency(USD)",
      'RUB': "currency(RUB)"
    }
  });

  responses.push({
    'code': '509',
    'responseCode': '509_expiry_date',
    'description': 'Card expiry date is invalid',
    'checkoutmessage': 'We\'re sorry, we could not process your card request. Please verify the card expiry date on your card and retry.',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Verify Expiry': "highlight([expiryMonth, expiryYear])"
    }
  });

  responses.push({
    'code': '502',
    'responseCode': '502_invalid_card_name',
    'description': 'Invalid cardholder name',
    'checkoutmessage': 'We\'re sorry, we could not process your card request. Please verify the cardholder name and retry.',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Verify Name': "highlight([firstName, lastName])"
    }
  });


  responses.push({
    'code': '101N',
    'responseCode': '101_cvv_not_match',
    'description': 'A failed transaction specifically meaning: CVV Not Matched.',
    'checkoutmessage': 'We\'re sorry, we could not process your card request. Please verify the card CVV and retry.',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Re-enter CVV': "highlight([cvv])"
    }
  });

  responses.push({
    'code': '101I',
    'responseCode': '101_cvv_not_checked',
    'description': 'A failed transaction specifically meaning: CVV Not checked due to circumstances.',
    'checkoutmessage': 'Warning, there was a problem verifying your CVV. Do you wish to complete the purchase without verifying CVV?',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Re-enter CVV': "highlight([cvv])"
    }
  });

  responses.push({
    'code': '101U',
    'responseCode': '101_cvv_issuer_no_cert',
    'description': 'A failed transaction specifically meaning: CVV Issuer not certified.',
    'checkoutmessage': 'We\'re sorry, we could not process your card request. Your card issuer does not support CVV codes - we cannot accept such cards.',
    'checkoutOptions': {
      'Cancel': "reset()",
      'Try with Paypal': "otherProcessor()"
    }
  });

  responses.push({
    'code': '101P',
    'responseCode': '101_cvv_not_processed',
    'description': 'A failed transaction specifically meaning: CVV Not processed.',
    'checkoutmessage': 'We\'re sorry, we could not process your card request. Your card issuer does not support CVV codes - we cannot accept such cards.',
    'checkoutOptions': {
      'Cancel': "reset()",
      'Try with Paypal': "otherProcessor()"
    }
  });

  responses.push({
    'code': 'timeout',
    'responseCode': 'timeout',
    'description': 'Timeout.',
    'checkoutmessage': 'Sorry, we experienced a problem sending your request to your bank and your transaction was not successfull. ',
    'checkoutOptions': {
      'Cancel': "rest()",
      'Retry': "retry()"
    }
  });

  function findResponse (element, index, array) {
    return resultCode === element.code;
  }

  // Match the result code with an error object
  var response = responses.find(findResponse);
  return response;
}
