$(function () {
  // When the user selects another currency change the dropdown button and update the currency
  $(".dropdown-menu li a").click(function(){
    $(this).parents(".dropdown").find('.dropdown-id').text($(this).text());
    // Call converted total when the dropdown is changed
    convertedTotal();
  });
});
