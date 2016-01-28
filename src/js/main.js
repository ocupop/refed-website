// Image replacement
if(!Modernizr.svg || !Modernizr.inlinesvg)
{
  $('img.svg').each(function()
    {
    this.src = this.src.replace('.svg','.png');
      $(this).addClass('svg_loaded');
  });
}

// DOM is ready
jQuery(document).on('ready', function() {
  // Update the current getFullYear
  var d = new Date();
  $('.year').html(d.getFullYear());
});