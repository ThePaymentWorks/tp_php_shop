// Add an item to the cart
$("#emptycart").on("click", function (event) {
  // Add the item to the cart
  $.ajax({
    url: "/api/emptycart",
    type: "POST",
  }).done(function (res) {
    console.log(res);
  }).fail(function (err) {
    console.log(err);
  });
});
