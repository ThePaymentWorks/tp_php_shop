// Do nothing
function rest () {}

// Empty the users cart -> Send user to home page
function reset () {
  $.ajax({
    url: "/api/emptycart",
    type: "POST",
  }).done(function (res) {
    window.location.replace('/');
  }).fail(function (err) {
    console.log(err);
  });
}

// Waiting on implementation of 3dSecure
function threeDSecure () {}

// Highlight the elements passed to the function
function highlight (array) {
  // Go through array and highlight the selected fields
  array.forEach(function(item) {
    item.style.borderColor = "red";
  });
}

function contactUs () {
  // Probably just call rest? Look into the intercom integration
}

function currency (currency) {
  // Change the value of the currency field to the selected currency
  $(".dropdown").find('.btn').html(currency.textContent + ' <span class="caret"></span>');
  $(".dropdown").find('.btn').val(currency.textContent);
}

// Dummy message for paying with paypal (another payment processor)
function otherProcessor () {
  window.location.replace('https://www.paypal.com/ie/webapps/mpp/home');
}

// Re-submit the form ensuring a success message
function retry () {
  $('#total').val(function (index, value) {
    return value = 0.00;
  });

  checkout();
}
