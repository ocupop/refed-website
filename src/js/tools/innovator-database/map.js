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

  // var locations = [
  //   {lat: -31.563910, lng: 147.154312},
  //   {lat: -33.718234, lng: 150.363181},
  //   {lat: -33.727111, lng: 150.371124},
  //   {lat: -33.848588, lng: 151.209834},
  //   {lat: -33.851702, lng: 151.216968},
  //   {lat: -34.671264, lng: 150.863657},
  //   {lat: -35.304724, lng: 148.662905},
  //   {lat: -36.817685, lng: 175.699196},
  //   {lat: -36.828611, lng: 175.790222},
  //   {lat: -37.750000, lng: 145.116667},
  //   {lat: -37.759859, lng: 145.128708},
  //   {lat: -37.765015, lng: 145.133858},
  //   {lat: -37.770104, lng: 145.143299},
  //   {lat: -37.773700, lng: 145.145187},
  //   {lat: -37.774785, lng: 145.137978},
  //   {lat: -37.819616, lng: 144.968119},
  //   {lat: -38.330766, lng: 144.695692},
  //   {lat: -39.927193, lng: 175.053218},
  //   {lat: -41.330162, lng: 174.865694},
  //   {lat: -42.734358, lng: 147.439506},
  //   {lat: -42.734358, lng: 147.501315},
  //   {lat: -42.735258, lng: 147.438000},
  //   {lat: -43.999792, lng: 170.463352}
  // ];
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
      zoom: 4,
      // mapTypeId: 'terrain',
      gestureHandling: 'none',
      center: new google.maps.LatLng(41.850033, -100.6500523)
      // center: {lat: -28.024, lng: 140.887}
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



      // var map;
      // function initMap() {
      //   map = new google.maps.Map(document.getElementById('map'), {
      //     zoom: 2,
      //     center: new google.maps.LatLng(2.8,-187.3),
      //     mapTypeId: 'terrain'
      //   });

      //   // Create a <script> tag and set the USGS URL as the source.
      //   var script = document.createElement('script');
      //   // This example uses a local copy of the GeoJSON stored at
      //   // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
      //   script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
      //   document.getElementsByTagName('head')[0].appendChild(script);
      // }




