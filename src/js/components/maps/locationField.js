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

$.behaviors('.locationField', locationField);

  function locationField(field) {
    // field = $(field);

    if (typeof google === "undefined") {
        window.console.log("Gotta load google maps");
        // lazyLoadGoogleMaps();
    } else {                
        window.console.log("Google Maps is already loaded: Initialize autocomplete");
        // googleMapsLoaded();
        initAutocomplete(field);
    }
  }

  function initAutocomplete(field) {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(field),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', filterResults);
  }

  function filterResults() {

    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    if (!place.geometry) {
      // Get the geometry from another API request
      // http://maps.googleapis.com/maps/api/geocode/xml?address=
      // window.console.log("Cleared the field or had an issue with the location");
      if (place.name == '') {
        $('body').trigger('noLocation');
      } else {
        // Leave a message with instructions
        alert('Valid location was not selected. Searching by keyterm "'+place.name+'" instead');
        searchFilter(place.name, mixer);
      }

      return;
    } else {
      var location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
    }

    $('body').trigger('searchLocation', [location]);

  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  window.geolocate = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }

})();