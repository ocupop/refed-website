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

$.behaviors('.policyFinder_map', initMap);
$.behaviors('.mapnav', initMapNav);

var active_category;

  function initMap(map) {

    var width = 960,
        height = 500;

    var svg = d3.select(map)
          .append("svg")
          .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("viewBox", "0 0 "+width+" "+height+"");

    var projection = d3.geo.albersUsa()
      .scale(1000)
      .translate([width / 2, height / 2]);
     
    var path = d3.geo.path()
      .projection(projection);

    // Append Div for tooltip to SVG
    var tip = d3.select("#tooltip");
    queue()
      // .defer(d3.json, '/data/states.json')
      .defer(d3.json, '/data/us-states.json')
      .defer(d3.json, '/data/casestudies.json')
      .defer(d3.json, '/data/municipalities.json')
      .await(buildMap);

    function buildMap(error, states, casestudies, municipalities) {
      svg.selectAll(".states")
        .data(states.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr('class', 'states')
        .attr('id', function(d) { return d.properties.name.replaceAll(" ", "-").toLowerCase(); })
        .on('click', function(d) {
          var url = "/tools/food-waste-policy-finder/states/"+d.properties.name.replaceAll(" ", "-").toLowerCase();
          window.location.href = url;
        });

      svg.selectAll('.municipality')
        .data(municipalities.features)
        .enter()
        .append("svg:image")
        .attr("xlink:href", function(d) { return "/img/icons/policy/muni_icon.svg"; })
        .attr("width", 28)
        .attr("height", 28)
        .attr("opacity", 0.7)
        .attr("transform", function(d) { return "translate(" + projection(d.properties.geometry.coordinates) + ")"; })
        .attr('class', function(d) { return "muni "+d.category; });
        // .append("path")
        // .attr('d', path.pointRadius(10))
        // .attr('class', "municipality");

      svg.selectAll('.study')
        .data(casestudies.features)
        .enter()
        .append("svg:image")
        .attr("xlink:href", function(d) { var effect = d.effect || ''; return "/img/icons/policy/"+d.category+"_study_"+ effect +"icon.svg"; })
        .attr("width", 28)
        .attr("height", 28)
        .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
        .attr('class', function(d) { return "study "+d.category; })
        .on("click", function(d) {
          $('#tooltip')
            .find('.title').text(d.properties.title).end()
            .find('.summary').text(d.properties.summary).end()
            .find('.button').attr('class', 'button '+d.category).end()
            .addClass('active');

          // tip.style("left", (d3.event.pageX - 35) + "px")
          //   .style("top", (d3.event.pageY + 20) + "px");
        });
        // .on("mouseout", function(d) {
        //   tip.attr('class', 'hide')
        // });

    }
  }

  function initMapNav(mapnav) {
    mapnav = $(mapnav);
    var search = window.location.search;
    var testing = false;
    
    if(testing) {

      // ========== Temporarily deactivate the wizard for testing
      window.console.log("TESTING MODE: MAPNAV");
      activateMap(mapnav, search);

    } else {

      startMapWizard(mapnav);

      if(search) {
        activateMap(mapnav, search);
      } else {
        mapnav.on('click', function(e) {
          if(e.hasOwnProperty('originalEvent')) {
            activateMap(mapnav);
          } else {
            // window.console.log("map.js: initMapNav(); - Program Click");
          }
        });
      }

      // Add listeners to activate map
      $('.show0, .mapInstructions').on('click', function() {
        activateMap(mapnav);
      });

    }


    // ========== Setup mapnav listeners

    $(".nav_category").each(function() {

      var nav_category = $(this),
          nav_category_label = nav_category.data('category');

      nav_category.find('.map-filter').on('click', function(e) {

        // window.console.log("CLICKING ON AN ACTIVE CHECKBOX");
        setFilter($(this));

      });

      nav_category.find('.map-subfilter').on('click', function(e) {

        // window.console.log("CLICKING ON AN ACTIVE SUBFILTER");
        setSubFilter($(this));

      });

      nav_category.find('.study-filter').on('click', function(e) {

        // window.console.log("TOGGLING A STUDY FILTER");
        toggleStudyFilter($(this));

      });

      // Hide all of the collapsible items in the other categories when you first open a category
      nav_category.find('.filters').on('show.bs.collapse', function() {
        // window.console.log("FILTER ACCORDION");
        $('.filters').not($(this)).collapse('hide');
      });
      
    });

    // mapnav.find('.filters').on('shown.bs.collapse', function () {
    //   var new_url = replaceUrlParam(window.location.href, 'category', $(this).attr('id') );
    //   window.history.replaceState('', 'ReFED - State Policy Map', new_url);
    // });

  }

  // function getCategory() {}
  // function getFilter() {}
  // function getSubFilter() {}

  function getActiveCategory() {
    return $('.policyFinder_map').attr('data-category');
  }
  function getActiveStudies() {
    return $('.policyFinder_map').attr('data-studies');
  }
  function setActiveCategory(category) {
    window.console.log("SETTING ACTIVE CATEGORY", category);
    // Clear all input on other categories
    $('.nav_category').each(function() {
      var nav_category = $(this).data('category');
      if(nav_category != category) {
        $(this).find('input').prop({
          checked: false,
          disabled: false
        });
      }
    });
    $('.policyFinder_map').attr('data-category', category);

  }

  function setActiveKey(key) {
    window.console.log("SETTING ACTIVE KEY", key);
    $('.policyFinder_map').attr('data-key', key);
  }

  function setActiveStudies(category) {
    window.console.log("SETTING ACTIVE STUDIES", category);
    $('.policyFinder_map').attr('data-studies', category);

  }


  function setFilter(input) {
    var subfilters = input.parent().find('.subfilters');
    var category = input.closest('.nav_category').data('category');
    var key = input.data('key');
    var active_studies = getActiveStudies();

    // Set the active category
    setActiveCategory(category);

    if(category != active_studies) {
      // Remove the active studies
      clearStudies();
    }

    // Set the active key
    setActiveKey(key);

    // Clear all other filter checkboxes
    clearFilters();
    // Collapse subfilters of other filters
    $('.subfilters').not(subfilters).collapse('hide');

    // Set input prop checked to true & disable input
    input.prop({
      checked: true,
      disabled: true
    });
    // Set all child inputs prop checked to true
    input.parent().find('.map-subfilter').prop({
      checked: true,
      disabled: false
    });
    // Open Collapsed subfilter list if it exists
    input.parent().find('.collapse.subfilters').collapse('show');
    // update map levels (this includes a reset of map)
    setMapLevels();
  }

  function setSubFilter(input) {
    var category = input.closest('.nav_category').data('category');
    var key = input.data('key');
    var active_studies = getActiveStudies();

    // Set the active category
    setActiveCategory(category);

    if(category != active_studies) {
      // Remove the active studies
      clearStudies();
    }

    // Set the active key
    setActiveKey(key);

    // Clear all other filter checkboxes
    clearFilters();

    // Set all other subfilters properties
    input.closest('.subfilters').find('.map-subfilter').prop({
      checked: false,
      disabled: false
    });
    // Set parent filter properties
    input.closest('.map-filter').prop({
      checked: false,
      indeterminate: true,
      disabled: false
    });
    // Set input properties
    // => We moved this down in the order to allow browser to complete UI update. This seems fragile to me.
    input.prop({
      checked: true,
      disabled: true
    });
    // update map levels (this includes a reset of map)
    setMapLevels();
  }

  function clearFilters() {
    $('.map-filter, .map-subfilter').prop({
      checked: false,
      disabled: false
    });
  }

  function clearStudies() {
    // window.console.log("CLEARING STUDIES");
    $('.study-filter').prop({
      checked: false
    });

    $('.policyFinder_map').attr('data-studies', '');
  }

  function toggleStudyFilter(input) {

    if(input.prop('checked')) {
      var category = input.val();
      var active_category = getActiveCategory();
      var key = input.data('key');

      // Clear all other study checkboxes
      clearStudies();

      // Set the active studies
      setActiveStudies(category);

      if(category != active_category) {
        // Set a new active category
        clearLevels();
        setActiveCategory(input.val());
      }

      // Set the active key
      setActiveKey(key);

      // Set the properties
      input.prop({
        checked: true,
        disabled: false
      });

    } else {

      setActiveStudies(false);

      // Set the properties
      input.prop({
        checked: false,
        disabled: false
      });

    }

    


  }

  function clearLevels() {
    $('path.states').removeClass(function (index, css) {
      return (css.match (/(^|\s)level-\S+/g) || []).join(' ');
    });
  }

  function getLevel(array, state) {
    // Filter the aray by state to see how many times a state is included
    // return array.filter(item => item == state).length;
    var level = array.filter(function(item) {
      return item == state;
    }).length;

    return level;
  }

  function setMapLevels() {
    window.console.log("UPDATING MAP LEVELS");
    var activeStates = [];

    $(".map-subfilter").each(function() {
      if($(this).prop('checked')) {
        var states = $(this).data('states');
        // window.console.log("ADDING A LEVEL FOR: ", states);
        states.forEach(function(state) {
          activeStates.push(state);
        });

      }
    });

    clearLevels();

    activeStates.forEach(function(state) {
      $('#'+ state).addClass('level-'+getLevel(activeStates, state));
    });
  }


  // function updateMapLevels() {
  //   var activeStates = [];
  //   $(".map-subfilter").each(function() {
  //     if($(this).is(':checked')) {
  //       var states = $(this).data('states');

  //       states.forEach(function(state) {
  //         activeStates.push(state);
  //       });

  //     }
  //   });
  //   clearLevels();
  //   activeStates.forEach(function(state) {
  //     $('#'+ state).addClass('level-'+getLevel(activeStates, state));
  //   });
  // }


  // Map Loading & Activation

  function activateMap(mapnav, search) {
    mapnav.removeClass('bottom');
    map = $(mapnav.data('target'));
    map.parent().finish().removeClass('mapWizard');

    $('#statenav').slideDown();
    
    // check url and trigger clicks in mapnav
    // window.console.log('#'+urlParams['category']);

    mapnav.find('#'+urlParams['category']).collapse('show');

    if(urlParams['filters']) {
      var filters = urlParams['filters'].split(',');

      for (i = 0; i < filters.length; i++) { 
        var filter_link = "#"+filters[i];
        setTimeout(function(){
          $(filter_link).click();
        }, i * 500);
      }
      // for(let i in filters) {
      //   window.console.log("filter:", filters[i]);
      //   setTimeout(function(){
      //     mapnav.find('#'+filters[i]).trigger('click');
      //   }, i * 500);
      // }
    }

  }
  function startMapWizard(mapnav) {
    var wizard = $('.mapWizard');

    pageScroll('#pageContent', 120);
    mapnav.removeClass('bottom');
    wizard.delay(500)
      .queue(function() { 
        wizard.attr( "class", "mapWizard step1" ).dequeue();
        mapnav.find('.step1').trigger('click');
      })
      .delay(4000)
      .queue(function() {
        wizard.attr( "class", "mapWizard step2" ).dequeue();
        mapnav.find('.step2').trigger('click');
      })
      .delay(4000)
      .queue(function() {
        wizard.attr( "class", "mapWizard step3" ).dequeue();
        mapnav.find('.step3').trigger('click');
      })
      .delay(4000)
      .queue(function() {
        wizard.attr( "class", "mapWizard step4" ).dequeue();
        mapnav.find('.step4').trigger('click');
      })
      .delay(4000)
      .queue(function() {
        wizard.attr( "class", "mapWizard step5" ).dequeue();
        mapnav.find('.step5').trigger('click');
      })
      .delay(4000)
      .queue(function() {
        wizard.attr( "class", "mapWizard step6" ).dequeue();
        mapnav.find('.step6').trigger('click');
        $('#statenav').slideDown();
      })
      .delay(500)
      .queue(function() {
        wizard.attr( "class", "mapWizard" ).stop().finish();
      })
  }


})();


