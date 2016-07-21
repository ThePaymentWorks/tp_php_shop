function checkout() {
  console.log('checkout called');
  // Get the form data
  var formData = $('form').serializeArray();

  // Get the selected Currency
  var currency = $('#currencyDropDown').val();

  // Get the card number
  if ($('#cardNumber').val()) {
    var cardNumber = $('#cardNumber').val();
  } else {
    var cardNumber = $('#cardNumberDropDown').text().split("(", 1);
    cardNumber = cardNumber[0];
  }
  console.log(cardNumber);
  // Get the current total
  var total = parseFloat($('#total').val()).toFixed(2);

  // Check which API the user wants to use
  if ($('#toggle-provider').prop("checked")) {
    var api = 'realex';
  } else {
    var api = 'testingpays';
  }

  console.log(formData);
  // Send a request with the form data
  $.ajax({
    url: "/api/pay",
    type: "POST",
    data: {
      firstName: formData[0].value,
      lastName: formData[1].value,
      cardNumber: cardNumber,
      expiryMonth: formData[2].value,
      expiryYear: formData[3].value,
      cvv: formData[4].value,
      api: api,
      total: total,
      currency: currency
    }
  }).done(function (res) {
    // Create the new response item
    createResponse(res);
  }).fail(function (err) {
    createFunctionalResponse('timeout');
    console.log(err);
  });
}
