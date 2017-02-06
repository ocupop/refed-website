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

  $.behaviors('.siteSearch', siteSearch);

  function siteSearch(form) {
    form = $(form);
    var input = form.find('input.keyterms');
    var submit = form.find('input[type="submit"]');

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    window.idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('url');
      this.field('key-solutions');
      this.field('supply-chain');
      this.field('description');
      this.field('type');
    });
    // Download the data from the JSON file we generated
    window.data = $.getJSON("/data/search.json");

    // Wait for the data to load and add it to lunr
    window.data.then(function(loaded_data){
      $.each(loaded_data, function(index, value){
        window.idx.add(
          $.extend({ "id": index }, value)
        );
      });
    });

    // Event when the form is submitted
    form.submit(function(){
        event.preventDefault();
        var query = $("#search_box").val(); // Get the value for the text field
        var results = window.idx.search(query); // Get lunr to perform a search
        display_search_results(results); // Hand the results off to be displayed
    });

    form.on('click', function () {
      $(this).addClass('active');
    });

    input.on('keyup', function(){
      window.console.log($(this).val());
      if($(this).val().length !=0) {
        submit.attr('disabled', false);
      } else {
        submit.attr('disabled',true);
      }
    });

  }

  function display_search_results(results) {
    window.console.log("displaying results");
    var $search_results = $("#search_results");

    // Wait for data to load
    window.data.then(function(loaded_data) {

      // Are there any results?
      if (results.length) {
        $search_results.empty(); // Clear any old results

        // Iterate over the results
        results.forEach(function(result) {
          var item = loaded_data[result.ref];

          // Build a snippet of HTML for this result
          var appendString = '<li>';
              appendString += '<h2><a href="' + item.url + '">'+ item.title +'</a></h2>';
              appendString += '<p><em>'+ item.url +'</em></p>';
              appendString += '<p>'+ item.description +'</p>';
              appendString += '</li>';

          // Add it to the results
          $search_results.append(appendString);
          $("#site-search-results").fadeIn();
          $("main").hide();
        });
      } else {
        $search_results.html('<li>No results found</li>');
      }
    });
  }

})();
