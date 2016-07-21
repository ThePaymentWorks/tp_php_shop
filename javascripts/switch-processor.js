$(function() {
  // $('#toggle-provider').on('switchChange.bootstrapSwitch', function(event, state) {
  //   console.log(this); // DOM element
  //   console.log(event); // jQuery event
  //   console.log(state); // true | false
  // });

  $('#toggle-provider').change(function() {
    console.log('change detected');
    // Check which processor is being displayed
    if ($(this).prop('checked')) {
      // Realex

      const cardNumberField = `
      <div id="cardNumberDropDown" class="cardNumber dropdown col-sm-4">
        <button class="btn btn-block dropdown-toggle card-dropdown" type="button" id="cardNumberDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" value="4263970000005262">4263970000005262 (00 ­ Successful)<span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <li><a>4263970000005262 (00 ­ Successful)</a></li>
          <li><a>4000120000001154 (101 ­ Declined)</a></li>
          <li><a>4000130000001724 (102 ­ Referral B)</a></li>
          <li><a>4000160000004147 (103 ­ Referral A)</a></li>
          <li><a>4009830000001985 (200 ­ Comms Error)</a></li>
        </ul>
      </div>
      `;

      $(".cardNumber").replaceWith(cardNumberField);

    } else {
      // Testing Pays
      const cardNumberField = `
        <div class="cardNumber col-sm-4">
          <input id="cardNumber" class="form-control" placeholder="e.g. 4319 5046 8156 3245" value="4263970000005262"  required>
        </div>
      `;

      $(".cardNumber").replaceWith(cardNumberField);
    }
    $(".dropdown-menu li a").click(function(){
      $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
      $(this).parents(".dropdown").find('.btn').text($(this).text());
    });
  })
})
