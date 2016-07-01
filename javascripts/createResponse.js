function createResponse (rawXML) {

  const xmldoc = $.parseXML(res);
  const $xml = $(xmldoc);
  const result = $xml.find('result');
  console.log($xml.find('result').text());
  console.log(result.tagName);

  var new_response = $("<div class='response-item'><h4>" + res + "</h4></div>").hide();

  // Append the item to the responses div
  $("#responses").append(new_response);

  // Show the response
  new_response.show('normal');

  // After 10 seconds delete the object
  setTimeout(function() {
    new_response.hide('slow', function() { new_response.remove(); });
  }, 15000);
}
