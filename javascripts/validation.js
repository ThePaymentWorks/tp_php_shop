(function () {

  // Custom rule to ensure that the credit card is valid
  jQuery.validator.addMethod("validCard", function(value, element) {
    const isValid = $('#cardNumber').validateCreditCard();
    return isValid.valid;
  }, "* Card number must be valid");

  jQuery.validator.addMethod("validMonth", function(value, element) {
    return (parseInt(value) > 0 && parseInt(value) < 12);
  }, "* Month must be valid (MM)");

  jQuery.validator.addMethod("validMonthAndYear", function(value, element) {
    const year = parseInt($('#expiryYear').val());
    const month = parseInt($('#expiryMonth').val());
    const date = new Date();
    return (year > date.getFullYear() || (year >= date.getFullYear() && month > date.getMonth()));
  }, "* You must select a month and year which are valid");

  jQuery.validator.addMethod("validYear", function(value, element) {
    const date = new Date();
    return parseInt(value) >= date.getFullYear();
  }, "* Please enter a year starting with the current year");

  // Set the rules for all of the forms fields
  $('form').validate({
    rules: {
      firstname: {
        required: true,
        minlength: 2,
        maxlength: 20,
        lettersonly: true
      },
      lastname: {
        required: true,
        minlength: 2,
        maxlength: 20,
        lettersonly: true
      },
      cardNumber: {
        required: true,
        minlength: 10,
        maxlength: 20,
        validCard: true
      },
      expiryMonth: {
        required: true,
        minlength: 2,
        maxlength: 2,
        validMonth: true
      },
      expiryYear: {
        required: true,
        minlength: 4,
        maxlength: 4,
        validYear: true,
        validMonthAndYear: true
      },
      cvv: {
        required: true,
        minlength: 3,
        maxlength: 4,
      }
    },
    messages: {
      firstname: {
        required: "Please enter your firstname",
        minlength: "Firstname should be more than 2 characters",
        maxlength: "Firstname should be less than 20 characters",
        lettersonly: "Firstname should contain only letters"
      },
      lastname: {
        required: "Please enter your lastname",
        minlength: "Lastame should be more than 2 characters",
        maxlength: "Lastame should be less than 20 characters",
        lettersonly: "Lastname should contain only letters"
      },
      cardNumber: {
        required: "Please enter your card number",
        minlength: "Card numbers should be more than 10 characters",
        maxlength: "Card numbers be less than 20 characters",
      },
      expiryMonth: {
        required: "Please enter your cards expiry month",
        minlength: "Expiry month in format MM",
        maxlength: "Expiry month in format MM",
      },
      expiryYear: {
        required: "Please enter your cards expiry year",
        minlength: "Expiry year in format YYYY",
        maxlength: "Expiry year in format YYYY",
      },
      cvv: {
        required: "Please enter your cards cvv number",
        minlength: "CVV should be 3 numbers",
        maxlength: "CVV should be 3 numbers",
      },
    },
    submitHandler: checkout,
  });
})();
