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
  $('[data-toggle="tooltip"]').tooltip();

  $.fn.extend({
    animateCss: function (animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this).addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      });
    }
  });
})
