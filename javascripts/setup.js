// General functions need during setup

$(function () {

  // Pad out the total with 2 decimal places
  $('#total').val(function () {
    return parseFloat(this.value).toFixed(2);
  });;

  // When the total is changed update the convertedTotal
  $('#total').change(function () {
    this.value = parseFloat(this.value).toFixed(2);
    convertedTotal();
  });

  // Call converted total on page load
  convertedTotal();

  // Enable bootstrap tooltips
  $('[data-toggle="tooltip"]').tooltip()
})
