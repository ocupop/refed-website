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

  function innovatorDatabase_map(container) {

    if (typeof google === "undefined") {
        window.console.log("Gotta load google maps");
        // lazyLoadGoogleMaps();
    } else {                
        window.console.log("Google Maps is already loaded: Initialize autocomplete");
        // googleMapsLoaded();
        initMap(container);
    }

  }

  function initMap(container) {
    var options = {
      zoom: 5,
      // mapTypeId: 'terrain',
      gestureHandling: 'none',
      // center: new google.maps.LatLng(41.850033, -100.6500523)
      center: {lat: 41.850033, lng: -95.6500523}
    };

    innovatorMap = new google.maps.Map(container, options);

    // Create a <script> tag and set the Innovator Database URL as the source.
    var script = document.createElement('script');
    // This example uses a jsonp data source from the jekyll built
    script.src = '/data/innovators.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  // Loop through the results array and place a marker for each
  // set of coordinates.
  window.load_innovatorMap = function(results) {
    // window.console.log("innovatorDatabase_map: Load Map",results);
    // var markers = [];

    var iconBase = '/img/icons/maps/markers/';
    var icons = {
      national: {
        icon: iconBase + 'national.png'
      },
      local: {
        icon: iconBase + 'local.png'
      }
    };

    for (var i = 0; i < results.innovators.length; i++) {
      var geolocation = results.innovators[i].geolocation;
      var location = new google.maps.LatLng(geolocation[0],geolocation[1]);
      var reach = results.innovators[i].innovator_reach;
      var marker = new google.maps.Marker({
        position: location,
        icon: icons[reach].icon,
        title: results.innovators[i].name,
        // animation: google.maps.Animation.DROP,
        map: innovatorMap
      });
      marker.details = results.innovators[i];
      marker.addListener('click', function() {
        window.console.log(this.details);
        // innovatorMap.setZoom(8);
        // innovatorMap.setCenter(this.getPosition());
      });
      // markers.push(marker);
    }

    // Add a marker clusterer to manage the markers.
    // var markerCluster = new MarkerClusterer(innovatorMap, markers, {imagePath: '/img/innovator-database/markers/m'});
  }

})();




