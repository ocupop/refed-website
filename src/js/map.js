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

$.behaviors('.map', initMap);

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
      .await(buildMap);

    function buildMap(error, states, casestudies) {
      svg.selectAll(".states")
        .data(states.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr('class', 'states')
        .attr('id', function(d) { return d.properties.name.trim(); })
        .on('click', function(d) {
          var url = "/states/"+d.properties.name.trim();
          window.location.href = url;
        });

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

})();


