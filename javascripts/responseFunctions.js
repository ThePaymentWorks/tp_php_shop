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
  var contact_modal = $(
    `<div class="modal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content" style="background-color:#f5f5f5">
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <img class="intercom-image" style="padding:40px" src="/assets/images/intercom.jpg">
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 text-center">
              <h4>Hi! How can I help?</h4>
              </div>
            </div>
          </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`
  ).appendTo('body');

  // If the modal already exists replace it, else append modal to the body
  if ($('body').children(".modal").length === 0) {
    $('body').append(contact_modal);
  } else {
    $('body').children(".modal").replaceWith(contact_modal);
  }

  // Show the response
  contact_modal.hide().fadeIn(500);

  $('.dismiss').click(function(e){
    contact_modal.hide();
  });
}

function currency (currency) {
  // Change the value of the currency field to the selected currency
  $(".dropdown").find('.btn').html(currency.textContent + ' <span class="caret"></span>');
  $(".dropdown").find('.btn').val(currency.textContent);

  // Update the converted currency
  convertedTotal();

  // Re-submit for a success
  retry();
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
