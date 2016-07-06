function createResponse (rawXML) {
  // Get the XML response and parse it
  var xmldoc = $.parseXML(rawXML);
  var $xml = $(xmldoc);
  var result = $xml.find('result');
  var style, icon;

  if ($xml.find('result').text() == '00') {
    style = 'success';
    icon = 'ok';
  } else {
    style = 'error';
    icon = 'remove';
  }

  // TODO : Move to using `` backticks to eval html
  var new_resp = $(
     "<div class='panel-group remove " + style + "'>"
      + "<div class='panel panel-default'>"
        + "<div class='panel-heading'>"
          + "<h4 class='panel-title'>"
            + "<span class='glyphicon glyphicon-" + icon + "' aria-hidden='true'></span>"
            + "<a data-toggle='collapse' href='#" + $xml.find('orderid').text() + "'>"
              + "Result Code : " + $xml.find('result').text()
            + "</a>"
            + "<span onClick='removeResponse()' class='glyphicon glyphicon-remove remove-response' aria-hidden='true'></span>"
          + "</h4>"

        + "</div>"
        + "<div id='" + $xml.find('orderid').text() + "' class='panel-collapse collapse'>"
          + "<div class='panel-body'>"
            + "<p>Message : " + $xml.find('message').text() + "</p>"
            + "<p>CVN Result : " + $xml.find('cvnresult').text() + "</p>"
            + "<p>Batch ID : " + $xml.find('batchid').text() + "</p>"
            + "<p>Auth Code : " + $xml.find('authcode').text() + "</p>"
          + "</div>"
        + "</div>"
      + "</div>"
  ).hide();

  // Append the item to the responses div
  $("#responses").append(new_resp);

  // Show the response
  new_resp.show('normal');

  // Show the functional user response
  createFunctionalResponse($xml.find('result').text());
}

function removeResponse () {
  $('.remove-response').on('click', function (event) {
    var parent = $(this).closest('.remove');
    parent.hide('slow', function () {
      parent.remove();
    });
  });
}
