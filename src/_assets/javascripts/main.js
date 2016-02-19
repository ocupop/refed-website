//= require jquery/dist/jquery
//= require chartist/dist/chartist.min.js
//= require vendor/jquery.drawDoughnutChart.js

// $(function() {
//     alert("HELLO");
// });

$(document).on('ready', function() {
  $( "#search-form").on('click', function () {
    $(this).addClass('active');
    $submit = $(this).find('input[type="submit"]');
  });
  $('input.keyterms').on('keyup', function(){
    window.console.log($(this).val());
      if($(this).val().length !=0) {
        $submit.attr('disabled', false);
      } else {
        $submit.attr('disabled',true);
      }
  });
});