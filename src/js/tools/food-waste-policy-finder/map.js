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

$.behaviors('.mapInstructions', mapInstructions);
$.behaviors('.policyFinder_map', initMap);
$.behaviors('.mapnav', initMapNav);


  function mapInstructions(container) {
    container = $(container);
    container.on('click', function() {
      $('.policyFinder_map').finish().addClass('active');
    });
  }

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
        .attr('id', function(d) { return d.properties.name.trim(); })
        .on('click', function(d) {
          var url = "/tools/food-waste-policy-finder/states/"+d.properties.name.trim();
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
        .attr("xlink:href", function(d) { return "/img/icons/policy/"+d.category+"_study_icon.svg"; })
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

          tip.style("left", (d3.event.pageX - 35) + "px")
            .style("top", (d3.event.pageY + 20) + "px");
        });
        // .on("mouseout", function(d) {
        //   tip.attr('class', 'hide')
        // });

    }
  }

  function initMapNav(mapNav) {

    var targetMap = $(mapNav).data('target');
    animateMap($('.mapWizard'));

    $('.map-filter, .map-subfilter').on('change', function(e) {
      var checked = $(this).prop("checked"),
          container = $(this).parent(),
          siblings = container.siblings();
      // window.console.log("mapnav.js: CONTAINER: ", container);

      container.find('input[type="checkbox"]').prop({
        indeterminate: false,
        checked: checked
      });

      function checkSiblings(el) {

        var parent = el.parent().parent(),
            all = true;

        el.siblings().each(function() {
          return all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
        });

        if (all && checked) {

          parent.children('input[type="checkbox"]').prop({
            indeterminate: false,
            checked: checked
          });

          checkSiblings(parent);

        } else if (all && !checked) {

          parent.children('input[type="checkbox"]').prop("checked", checked);
          parent.children('input[type="checkbox"]').prop("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0));
          checkSiblings(parent);

        } else {

          el.parents("li").children('input[type="checkbox"]').prop({
            indeterminate: true,
            checked: false
          });

        }

      }

      checkSiblings(container);
      updateMapLevels();
    });

    $(".nav_category").each(function() {
      var $el = $(this),
          cat = $el.data('category');

      $el.find('.map-filter, .map-subfilter, .study-filter').on('click', function() {

        var checked = this.checked ? true : false;
        var bp = $(this).hasClass('study-filter');
        var sf = $(this).hasClass('map-subfilter');
        var activeNav = $el.find('.map-filter:checked, .map-subfilter:checked').length;
        // window.console.log ("mapnav.js:", $(this), bp);

        if(checked) {
          var showStudies = $el.find('.study-filter:checked').length;
          var section = $(this).closest('.section_root').attr('data-section');
          var activeClass = "policyFinder_map active " + cat + " " + section;
          
          $(this).siblings('.collapse').each(function() {
            var children = $(this).find('.map-subfilter');
            if (children.length > 1) {
              $(this).collapse('show');
            }
          });

          $el.siblings('.nav_category').find('input[type="checkbox"]').prop({
            indeterminate: false,
            checked: false
          });
          if(!bp) {
            if(sf) {
              $el.find('.map-filter').not($(this).closest('.map-filter')).prop({
                indeterminate: false,
                checked: false
              });
            } else {
              $el.find('.map-filter, .map-subfilter').not(this).prop({
                indeterminate: false,
                checked: false
              });
            }
          }

          if(showStudies) {
            activeClass += " show-studies";
          }
          if(!activeNav) {
            clearLevels();
          }

          $(targetMap).attr('class', activeClass);

        } else {
          if(bp) { 
            $(targetMap).removeClass('show-studies');
          } else {
            clearLevels();
          }

        }
      });

      $el.find('.collapse').on('show.bs.collapse', function() {
        $el.siblings('.nav_category').find('.collapse').collapse('hide');
      });
    });
  }

  function clearLevels() {
    $('path.states').removeClass(function (index, css) {
      return (css.match (/(^|\s)level-\S+/g) || []).join(' ');
    });
  }

  function getLevel(array, state) {
    return array.filter(item => item == state).length;
  }

  function updateMapLevels() {
    var activeStates = [];
    $(".map-subfilter").each(function() {
      if($(this).is(':checked')) {
        var states = $(this).data('states');
        states.forEach(function(state) {
          activeStates.push(state);
        });
      }
    });
    clearLevels();
    activeStates.forEach(function(state) {
      $('#'+state).addClass('level-'+getLevel(activeStates, state));
      // console.log(state, getLevel(activeStates, state));
    });
  }

  function animateMap(map) {
    window.console.log("Start animation");
    var mapClass = map.attr('class'),
        mapnav = $('.mapnav');

    map.delay(2000)
      .queue(function() { 
        map.attr( "class", mapClass + ' step1' ).dequeue();
        mapnav.find('.step1').trigger('click');
      })
      .delay(2000)
      .queue(function() {
        map.attr( "class", mapClass + ' step2' ).dequeue();
        mapnav.find('.step2').trigger('click');
      })
      .delay(2000)
      .queue(function() {
        map.attr( "class", mapClass + ' step3' ).dequeue();
        mapnav.find('.step3').trigger('click');
      })
      .delay(2000)
      .queue(function() {
        map.attr( "class", mapClass + ' step4' ).dequeue();
        mapnav.find('.step4').trigger('click');
      })
      .delay(2000)
      .queue(function() {
        map.attr( "class", mapClass + ' step5' ).dequeue();
        mapnav.find('.step5').trigger('click');
      })
      .delay(2000)
      .queue(function() {
        map.attr( "class", mapClass + ' step6' ).dequeue();
        mapnav.find('.step6').trigger('click');
      })
      .delay(2000)
      .queue(function() {
        map.attr( "class", mapClass ).stop();
      })
  }

  window.onhashchange = function() {

      var hash        = window.location.hash;

      // Compare new hash with active hash
      // if (hash === activeHash) return; // no change

      // activeHash = hash;
      // filterMixerByGroupsState(groupsState, true);
  };

})();


