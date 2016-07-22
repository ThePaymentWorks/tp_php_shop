$(function() {
  $('#toggle-provider').change(function() {
    // Check which processor is being displayed
    if ($(this).prop('checked')) {
      // Realex is active

      var cardNumberField = `
      <div id="cardNumberDropDown" class="cardNumber dropdown col-sm-4">
        <button class="btn btn-block dropdown-toggle card-dropdown" type="button" id="cardNumberDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" value="4263970000005262">4263970000005262 (00 ­ Successful)<span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <li><a>4263970000005262 (00 ­ Successful)</a></li>
          <li><a>4000120000001154 (101 ­ Declined)</a></li>
          <li><a>4000130000001724 (102 ­ Referral B)</a></li>
          <li><a>4000160000004147 (103 ­ Referral A)</a></li>
          <li><a>4009830000001985 (200 ­ Comms Error)</a></li>
          <li><a>5425230000004415 (00 - Successful)</a></li>
          <li><a>5114610000004778 (101 - Declined)</a></li>
          <li><a>5114630000009791 (102 - Referral B)</a></li>
          <li><a>5121220000006921 (103 - Referral A)</a></li>
          <li><a>5135020000005871 (200 - Comms Error)</a></li>
          <li><a>374101000000608 (00 - Successful)</a></li>
          <li><a>375425000003 (101 - Declined)</a></li>
          <li><a>375425000000907 (102 - Referral B)</a></li>
          <li><a>343452000000306 (103 - Referral A)</a></li>
          <li><a>372349000000852 (200 - Comms Error)</a></li>
        </ul>
      </div>`;

      var cardNumberInfo = `
4263970000005262 (00 - Successful)
4000120000001154 (101 - Declined)
4000130000001724 (102 - Referral B)
4000160000004147 (103 - Referral A)
4009830000001985 (200 - Comms Error)
5425230000004415 (00 - Successful)
5114610000004778 (101 - Declined)
5114630000009791 (102 - Referral B)
5121220000006921 (103 - Referral A)
5135020000005871 (200 - Comms Error)
374101000000608 (00 - Successful)
375425000003 (101 - Declined)
375425000000907 (102 - Referral B)
343452000000306 (103 - Referral A)
372349000000852 (200 - Comms Error)`;

      var totalInfo = `Enter any amount in this field. Realex’s test system ignores the test amount.`;

      $(".cardNumber").replaceWith(cardNumberField);
      $("#cardNumberInfo").attr('data-original-title', cardNumberInfo);
      $("#total-info").attr('data-original-title', totalInfo);

      // Add the dropdownreplace functionality again
      $(".dropdown-menu li a").click(function(){
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').text($(this).text());
      });
    } else {
      // Testing Pays is active
      var cardNumberField = `
        <div class="cardNumber col-sm-4">
          <input id="cardNumber" class="form-control" placeholder="e.g. 4319 5046 8156 3245" value="4263970000005262"  required>
        </div>`;

      var cardNumberInfo = `When pointing at the TestingPays Sim, you can use any valid credit number in this field.`;

      var totalInfo = `When pointing at TestingPays Sim, use the decimal part of the amount to get back the Realex API response you  want to test.
Examples:

123.00 (00 - Successful)
52.10 (101_declined_bank)
400.12 (103_card_stolen)
76.21  (205_bank_comm)
45.22 (507_currency)
670.16 (603_error)`;

      $(".cardNumber").replaceWith(cardNumberField);
      $("#cardNumberInfo").attr('data-original-title', cardNumberInfo);
      $("#total-info").attr('data-original-title', totalInfo);
    }
  })
})
