function checkout() {
  // Disable the button until the response is gotten again
  $('#checkout').attr("disabled", true);

  // Get the form data
  var formData = $('form').serializeArray();

  // Get the selected Currency
  var currency = $('#currencyDropDown').val();

  // Get the card number
  var cardNumber = $('#cardNumberDropDown').val();

  // Get the current total
  var total = parseFloat($('#total').val()).toFixed(2);

  // Check which API the user wants to use
  if ($('#toggle-provider').prop("checked")) {
    var api = 'realex';
  } else {
    var api = 'testingpays';
  }

  // Send a request with the form data
  $.ajax({
    url: "/api/pay",
    type: "POST",
    data: {
      firstname: formData[0].value,
      lastname: formData[1].value,
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

    // Re-enable the button
    $('#checkout').attr("disabled", false);
  }).fail(function (err) {
    createFunctionalResponse('timeout');

    // Re-enable the button
    $('#checkout').attr("disabled", false);

    console.log(err);
  });
}
