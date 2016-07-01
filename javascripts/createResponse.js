function createResponse (rawXML) {
  const xmldoc = $.parseXML(rawXML);
  const $xml = $(xmldoc);
  const result = $xml.find('result');

  if ($xml.find('result').text() == '00') {
    var style = 'success';
    var icon = 'ok';
  } else {
    var style = 'error';
    var icon = 'remove';
  }

  const new_resp = $(
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
}

function removeResponse () {
  $('.remove-response').on('click', function (event) {
    const parent = $(this).closest('.remove')
    parent.hide('slow', function () {
      parent.remove();
    });
  });
}
