function createFunctionalResponse (resultCode) {
  // Get the appropriate object from the list of responses
  var response = getResponseObject(resultCode);

  // Create the buttons to be held in the modal
  var buttons = '';

  // Loop through all of the checkout Options and set the buttons
  Object.keys(response.checkoutOptions).forEach(function (key) {
    console.log(response.checkoutOptions);
    buttons = buttons.concat(`<button type="button" onClick='${response.checkoutOptions[key]}' class="btn btn-default dismiss ${key}" data-dismiss="modal">${key}</button>`);
  });

  // Create the html object
  var func_resp = $(
    `<div class="modal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close dismiss" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">${response.description}</h4>
          </div>
          <div class="modal-body">
            <p>${response.responseCode}</p>
            <p>${response.checkoutmessage}</p>
          </div>
          <div class="modal-footer">
            ${buttons}
          </div>
        </div>
      </div>
    </div>`
  ).appendTo('body');

  // If the modal already exists replace it, else append modal to the body
  if ($('body').children(".modal").length === 0) {
    $('body').append(func_resp);
  } else {
    $('body').children(".modal").replaceWith(func_resp);
  }

  // Show the response
  func_resp.hide().fadeIn(500);

  $('.dismiss').click(function(e){
    func_resp.hide();
  });
}
