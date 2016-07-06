function createFunctionalResponse (resultCode) {
  // Get the appropriate object from the list of responses
  var response = getResponseObject(resultCode);

  // Create the html object
  var func_resp = $(
    `<div class="modal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close dismiss" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">${response.responseCode}</h4>
          </div>
          <div class="modal-body">
            <p>One fine body&hellip;</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default dismiss" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>`
  ).appendTo('body');

  // If the modal already exists replace it, else append modal to the body
  if ($('body').children(".modal").length == 0) {
    $('body').append(func_resp);
  } else {
    $('body').children(".modal").replaceWith(func_resp);
  }

  // Show the response
  func_resp.hide().fadeIn(1000);

  $('.dismiss').click(function(e){
    func_resp.hide()
  });
}
