// Make a payment request
$("#checkout").on("click", function (event) {
  // Get the form data
  var formData = $('form').serializeArray();
  // Send a request with the form data
  $.ajax({
    url: "/api/pay",
    type: "POST",
    data: {
      firstname: formData[0].value,
      lastname: formData[1].value,
      cardNumber: formData[2].value,
      expiryMonth: formData[3].value,
      expiryYear: formData[4].value,
      cvv: formData[5].value
    }
  }).done(function (res) {
    // Create the new response item
    var new_response = $("<div class='response-item'><h4>" + res + "</h4></div>").hide();

    // Append the item to the responses div
    $("#responses").append(new_response);

    // Show the response
    new_response.show('normal');

    // After 10 seconds delete the object
    setTimeout(function() {
      new_response.hide('slow', function(){ $target.remove(); });
    }, 15000);

  }).fail(function (err) {
    console.log(err);
  });
})
