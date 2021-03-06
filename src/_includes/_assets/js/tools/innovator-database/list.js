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

$.behaviors('.innovatorDatabase_list', innovatorDatabase_list);

  function innovatorDatabase_list(list) {



    $(window).on('searchLocation', function(event, location) {
        var searchLocation = new google.maps.LatLng(location.lat, location.lng);
        updateInnovatorDistances(list, searchLocation, mixer);
    });

    $(window).on('noLocation', function(event) {
        var searchLocation = new google.maps.LatLng(location.lat, location.lng);
        clearInnovatorDistances(list, mixer);
    });


    list = $(list);

    $('[data-sort]').on('click', function(){
      var sort = $(this).attr('data-sort');
      // window.console.log(mixer.getState());
      // var filterState = mixer.parseFilterGroups();
      // window.console.log(mixer.parseFilterGroups());
      var status = mixer.getFilterGroupSelectors('business_model');
      var hierarchy = mixer.getFilterGroupSelectors('hierarchy');
      var category = mixer.getFilterGroupSelectors('innovator_category');

      mixer.sort(sort)
        .then(function(state) {
            mixer.setFilterGroupSelectors('hierarchy', hierarchy);
            mixer.setFilterGroupSelectors('business_model', status);
            mixer.setFilterGroupSelectors('innovator_category', category);

            mixer.parseFilterGroups();
        });

      if(sort == 'default:asc'){
        $(this).attr('data-sort', 'default:desc');
      } else {
        $(this).attr('data-sort', 'default:asc');
      }
    });

    $('[data-target="#innovatorList"]')
      .on('shown.bs.tab', function(e) {
        // Scroll to top
        window.scrollTo(0, 0);
        // Set active menu
        $('.innovatorDatabase_menu').attr('data-menu', 'filter');
      });

  }

  function clearInnovatorDistances(list, mixer) {
    // TODO - Display a message here
    list.find('.innovator_distance').fadeOut();
    mixer.sort('default:asc');
  }

  function updateInnovatorDistances(list, searchLocation, mixer) {

    mixer.sort('default:asc', false);

    list.find('.innovator').each(function() {
        var lat = $(this).data('lat')/1,
            lng = $(this).data('lng')/1,
            position = new google.maps.LatLng(lat, lng);

        var distance = calcDistance(position, searchLocation);

        $(this).find('.distance').text(distance).end()
               .find('.innovator_distance').show().end()
               .attr('data-distance', distance);
    });

    mixer.sort('distance:asc')
        .then(function(state) {
            console.log(state.activeSort.sortString); // 'price:desc'
        });

  }
  function calcDistance(p1, p2) {
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) * 0.000621371).toFixed(0);
  }

})();
