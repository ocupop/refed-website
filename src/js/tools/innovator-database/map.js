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


Google API key: AIzaSyDwNUfXSzS2DIWfUsYhhbIM22xUtNJ4DtM

 */
(function() {

$.behaviors('.innovatorDatabase_map', innovatorDatabase_map);

  var innovatorMap;
  // var infowindow = new google.maps.InfoWindow();
  var marker,
      markers = [],
      searchLocation = null;

  function innovatorDatabase_map(container) {

    if (typeof google === "undefined") {
        window.console.log("Gotta load google maps");
        // lazyLoadGoogleMaps();
    } else {                
        // window.console.log("Google Maps is already loaded: Initialize autocomplete");
        // googleMapsLoaded();
        initMap(container);
    }

    $(window).on('mixStart', function(event) {
      window.console.log('HELLO');
      var uids = $.map(event.detail.futureState.matching, function(i) {
        return($(i).data('uid'));
      });
      var show = [];
      var hide = [];

      for (var i = 0; i < markers.length; i++) {
        if(uids.includes(markers[i].id)) {
          hide.push(markers[i]);
          markers[i].setVisible(true);
        } else {
          show.push(markers[i]);
          markers[i].setVisible(false);
        }
      }
      window.console.log("Event Details: ", event.detail);
      window.console.log("Markers: ", markers.length);
      window.console.log("UIDS: ", uids.length);
      window.console.log("SHOWING: ", show.length);
      window.console.log("HIDING: ", hide.length);

    });

  }

  function initMap(container) {
    var options = {
      zoom: 4,
      // mapTypeId: 'terrain',
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      scrollwheel: false,
      gestureHandling: 'none',
      styles: {},
      // center: new google.maps.LatLng(41.850033, -100.6500523)
      center: {lat: 41.850033, lng: -95.6500523}
    };

    innovatorMap = new google.maps.Map(container, options);

    // Create a <script> tag and set the Innovator Database URL as the source.
    var script = document.createElement('script');
    // This example uses a jsonp data source from the jekyll built
    script.src = '/data/innovators.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    $('[data-target="#innovatorMap"]').on('shown.bs.tab', function(e) {
      // Scroll to top
      window.scrollTo(0, 0);
      // Set active menu
      $('.innovatorDatabase_menu').attr('data-menu', 'filter');
      // Update this with some type of default page load logic. Need to know how to track the state of teh map accross page refresh.
      google.maps.event.trigger(innovatorMap, 'resize');
      var searchLocation = $('#autocomplete').val();
      if(!searchLocation) {
        innovatorMap.setCenter({lat: 41.850033, lng: -95.6500523});
        innovatorMap.setZoom(4);
      }
    });

    $('[data-toggle="tab"]').on('hide.bs.tab', function(e) {
      $('#tooltip').removeClass('active');
    });

    innovatorMap.addListener('click', function() {
      window.scrollTo(0, 0);
      $("#tooltip").removeClass('active');
    });
  }

  // Loop through the results array and place a marker for each
  // set of coordinates.
  window.load_innovatorMap = function(results) {
    // window.console.log("innovatorDatabase_map: Load Map",results);

    var iconBase = '/img/icons/maps/markers/';
    var icons = {
      national: {
        icon: iconBase + 'national.png'
      },
      local: {
        icon: iconBase + 'local.png'
      }
    };

    var innovators = $('.innovatorDatabase_list .innovator');

    innovators.each(function() {
      var innovator = $(this);

      var location = new google.maps.LatLng(innovator.data('lat'),innovator.data('lng'));
      var reach = innovator.data('innovator-level');

      var marker = new google.maps.Marker({
        position: location,
        icon: icons[reach].icon,
        // opacity: 0.7,
        title: innovator.data('title'),
        // animation: google.maps.Animation.DROP,
        map: innovatorMap
      });
      marker.id = innovator.data('uid');
      marker.details = innovator.data();


      marker.addListener('click', function() {
        var d = this.details;

        window.console.log("Innovator Object: ", d);
        $('#tooltip')
          .find('[data-content="title"]').text(d.title).end()
          .find('[data-content="description"]').text(d.description).end()
          .find('[data-content="business-model"]').text(d.businessModel).end()
          .find('[data-content="innovator-category-options"]').text(d.innovatorCategoryOptions.replaceAll('-', ' ').replace(/\b\w/g, function(l){ return l.toUpperCase() })).end()
          .find('[data-content="food-recovery-hierarchy-option"]').text(d.foodRecoveryHierarchyOption).end()
          .find('[data-content="innovator-level"]').text(d.innovatorLevel).end()
          .find('.icon').removeClass('icon-local').removeClass('icon-national').addClass("icon-"+d.innovatorLevel).end()
          .find('[data-content="website"]').text(d.website).attr('href', d.website).end()
          .find('[data-content="url"]').attr('href', d.url).end()
          .find('.innovator_details').show().end()
          .find('.analysis_details').hide().end()
          .addClass('active');
        innovatorMap.setZoom(8);
        innovatorMap.setCenter(this.getPosition());

      });

      marker.addListener('hideMarker')
      
      markers.push(marker);
    });

    // If we decide to go to a single dataset instead of using the DOM... use this logic to replace the .each()
    // for (var i = 0; i < results.innovators.length; i++) {
    //   var geolocation = results.innovators[i].geolocation;
    //   var location = new google.maps.LatLng(geolocation[0],geolocation[1]);
    //   var reach = results.innovators[i].innovator_reach_category;
    //   var marker = new google.maps.Marker({
    //     position: location,
    //     icon: icons[reach].icon,
    //     // opacity: 0.7,
    //     title: results.innovators[i].name,
    //     // animation: google.maps.Animation.DROP,
    //     map: innovatorMap
    //   });
    //   marker.details = results.innovators[i];
    //   marker.addListener('click', function() {
    //     window.console.log(this.details);

    //     var d = this.details;
    //     $('#tooltip')
    //       .find('[data-content="innovator_name"]').text(d.name).end()
    //       .find('[data-content="innovator_description"]').text(d.description).end()
    //       .find('[data-content="organization_classification"]').text(d.organization_classification).end()
    //       .find('[data-content="innovator_categories"]').text(d.innovator_categories).end()
    //       .find('[data-content="food_recovery_category"]').text(d.food_recovery_category).end()
    //       .find('[data-content="innovator_reach_category"]').text(d.innovator_reach_category).end()
    //       .find('.icon').addClass("icon-"+d.innovator_reach_category).end()
    //       .find('[data-content="innovator_website"]').text(d.website).attr('href', d.website).end()
    //       .find('[data-content="innovator_url"]').attr('href', d.url).end()
    //       .addClass('active');
    //     innovatorMap.setZoom(8);
    //     innovatorMap.setCenter(this.getPosition());

    //   });
    //   markers.push(marker);
    // }

    // Add a marker clusterer to manage the markers.
    // var markerCluster = new MarkerClusterer(innovatorMap, markers, {imagePath: '/img/innovator-database/markers/m'});
  }

  $(window).on('searchLocation', function(event, location) {

      var searchLocation = new google.maps.LatLng(location.lat, location.lng);
      var marker = new google.maps.Marker({
        position: searchLocation,
        animation: google.maps.Animation.DROP,
        map: innovatorMap
      });

      innovatorMap.setZoom(8);
      innovatorMap.setCenter(searchLocation);
  });

})();




