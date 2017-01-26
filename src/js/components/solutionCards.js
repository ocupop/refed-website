/* Copyright (C) 2017 Ocupop
 * 
 * http://www.ocupop.com
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see
 * http://www.gnu.org/licenses/agpl-3.0.html.
 */
(function() {

$.behaviors('#solution-cards', solutionCards);

function solutionCards(container) {
  container = $(container);
  var limit = container.data('limit');

  $('#solution-cards').mixItUp({
    controls: {
      enable: false 
      // as we are interacting via the API, we can disable default controls to increase performance
    },
    load: {
      sort: urlParams["sort"]+":dsc"
    },
    callbacks: {
      onMixEnd: function(state){
        // window.console.log(state);
      }
    },
    selectors: {
      target: '.card',
      filter: '.filter',
      sort: '.sort'
    },
    pagination: {
      limit: limit
    }
  });

  $('.sort').on('click', function() {
    $(".impact-summary").text($(this).attr('data-description'));

    // window.console.log("GONNA SORT");
    var activeClass = $(this).attr('data-sort');
    sortCards(activeClass);
    $('.sort').each(function() {
      $(this).removeClass('active');
      if ($(this).hasClass(activeClass)) {
        $(this).addClass('active');
      }
    });
  });

  if(urlParams["sort"]) {
    var key = urlParams["sort"]
    $('[data-sort="'+key+'"]').trigger('click');
  } else {
    $('.sort').first().trigger('click');
  }

  var inputText;
  var $matching = $();

  // Delay function
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  $("#terms").keyup(function(){
    // Delay function invoked to make sure user stopped typing
    delay(function(){
      inputText = $("#terms").val().toLowerCase();
      // Check to see if input field is empty
      if ((inputText.length) > 0) {
        $( '.card').each(function() {
          $this = $("this");
           // add item to be filtered out if input text matches items inside the title   
           if($(this).find('.title').text().toLowerCase().match(inputText)) {
            $matching = $matching.add(this);
          }
          else {
            // removes any previously matched item
            $matching = $matching.not(this);
          }
        });
        $("#solution-cards").mixItUp('filter', $matching);
      }

      else {
        // resets the filter to show all item if input is empty
        $("#solution-cards").mixItUp('filter', 'all');
      }
    }, 200 );
  });

}

function hideCards(impact) {
  // window.console.log("HIDING EMPTY CARDS");
  var $filtered = $();
  $( '.card').each(function() {
    $this = $(this);
     // add item to be filtered out if input text matches items inside the title 
    if($this.attr('data-'+impact) != "0") {
      $filtered = $filtered.add($this);
    } else {
      // removes any previously matched item
      $filtered = $filtered.not(this);
    }
  });
  // window.console.log($filtered);
  $("#solution-cards").mixItUp('filter', $filtered);
}

function sortCards(impact) {
  // window.console.log("SHOULD SORT", impact);
  var l = window.location.pathname + "?sort="+impact;
  window.history.pushState('', '{{ site.title }}: Solutions', l);

  $('.card .stat').hide().filter("."+impact).show();

  $('#solution-cards').mixItUp('multiMix', {
    sort: impact+":dsc"
  }, true, hideCards(impact) );
}

})();
