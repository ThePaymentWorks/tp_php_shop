$(".addToCart").on("click", function (event) {
  // Get the product information
  var data = $(this).data('content');
  data = data.split(",");

  // Add the item to the cart
  $.ajax({
    url: "/api/addtocart",
    type: "POST",
    data: {
      name : data[0],
      price: data[1],
      quantity: 1
    }
  })
});
