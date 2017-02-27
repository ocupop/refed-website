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

$.behaviors('.innovatorDatabase_categories', innovatorDatabase_categories);
$.behaviors('.innovatorDatabase_analysisCharts', initCharts);


  function innovatorDatabase_categories(container) {
    window.console.log("Hello:");

    $('[data-chart]').on('click', function() {
      $('[data-chart]').removeClass('active');
      $(this).addClass('active');

      var chart = $(this).attr('data-chart');
      $('.analysisChart').removeClass('active');
      $(chart).addClass('active');
    });

  }


  function initCharts(container) {
    // container = $(container);

    var data = buildChartData();



    new Chartist.Bar('#analysisChart_category .ct-chart', {
      
      labels: data.labels,
      series: [data.category.total_count]

    }, {
      // axisY: {
      //   labelInterpolationFnc: function(value) {
      //     return (value / 1000) + 'k';
      //   }
      // }
    }).on('draw', function(data) {
      if(data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 40px'
        });
      }
    });

    new Chartist.Bar('#analysisChart_status .ct-chart', {
      
      labels: data.labels,
      series: [data.status.forprofit, data.status.nonprofit]

    }, {
      stackBars: true,
    }).on('draw', function(data) {
      if(data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 40px'
        });
      }
    });

    new Chartist.Bar('#analysisChart_hierarchy .ct-chart', {
      
      labels: data.labels,
      series: [data.hierarchy.prevention, data.hierarchy.recovery, data.hierarchy.recycling]

    }, {
      stackBars: true,
    }).on('draw', function(data) {
      if(data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 40px'
        });
      }
    });


    $('a[href$="#innovatorAnalysis"]').on('show.bs.tab', function(e) {
      // $(window).trigger('resize');
      window.fireEvent('resize');
      // window.dispatchEvent(new Event('resize'));
    });

  }

  function buildChartData() {
    var options = $('#innovator_categories option').not(":eq(0)");
    var data = {
      labels: [],
      category: {
        total_count: []
      },
      status: {
        forprofit: [],
        nonprofit: []
      },
      hierarchy: {
        prevention: [],
        recovery: [],
        recycling: []
      }
    };

    var category = {};
    var status = {};
    var hierarchy = {};

    var series_array = [];

    options.each(function() {
      var label = $(this).text().replace(/ [ \r\n]+/gm, ""),
          filter = $(this).val(),
          filtered = $(filter),
          total_count = filtered.length;
          forprofit = filtered.filter("[data-organization-classification='nonprofit']").length,
          nonprofit = filtered.filter("[data-organization-classification='for-profit']").length,
          prevention = filtered.filter("[data-hierarchy='prevention']").length,
          recovery = filtered.filter("[data-hierarchy='recovery']").length,
          recycling = filtered.filter("[data-hierarchy='recycling']").length;

      data.labels.push(label);
      data.category.total_count.push(total_count);
      data.status.forprofit.push(forprofit);
      data.status.nonprofit.push(nonprofit);
      data.hierarchy.prevention.push(prevention);
      data.hierarchy.recovery.push(recovery);
      data.hierarchy.recycling.push(recycling);
    });


    window.console.log("DATA: ", data);

    // return {
    //   labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    //   series: [
    //     [800000, 1200000, 1400000, 1300000],
    //     [200000, 400000, 500000, 300000],
    //     [100000, 200000, 400000, 600000]
    //   ]
    // };
    return data;
    // window.console.log("RECYCLE INNOVATORS: ", $("[data-innovator-categories='secondary-marketplace']").length);
  }

})();
