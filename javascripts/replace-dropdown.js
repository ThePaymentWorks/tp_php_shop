$(function () {
  // When the user selects another currency change the dropdown button and update the currency
  $(".dropdown-menu li a").click(function(){
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).text());

    // Call converted total when the dropdown is changed
    convertedTotal();
  });
});
