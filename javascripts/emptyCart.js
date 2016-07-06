// Add an item to the cart
$("#emptycart").on("click", function (event) {
  // Add the item to the cart
  $.ajax({
    url: "/api/emptycart",
    type: "POST",
  }).done(function (res) {
    console.log(res);
    location.reload();
  }).fail(function (err) {
    console.log(err);
    alert('Error emptying the cart, please try again');
  });
});
