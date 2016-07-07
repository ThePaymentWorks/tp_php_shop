function convertedTotal () {
  // Get the currency and current total
  var currency = $(".dropdown").find('.btn').val();
  var total = $('#total').val();

  // Get the converted total
  switch (currency) {
    case 'EUR':
      $('#convertedTotal').text(total);
      break;

    case 'GBP':
      $('#convertedTotal').text((total * 0.85).toFixed(2));
      console.log('Converted GBP');
      break;

    case 'USD':
      $('#convertedTotal').text((total * 1.11).toFixed(2));
      console.log('Converted USD');
      break;

    case 'RUB':
      $('#convertedTotal').text((total * 70.85).toFixed(2));
      console.log('Converted RUB');
      break;
  }
}
