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

    $('[data-chart]').on('click', function() {
      $('[data-chart]').not(this).removeClass('active');
      $(this).toggleClass('active');

      var chart = $(this).attr('data-chart');
      $('.analysisChart').not(chart).not('#analysisChart_category').removeClass('active');
      $(chart).toggleClass('active');
    });

  }


  function initCharts(container) {
    // container = $(container);

    var data = buildChartData();



    new Chartist.Bar('#analysisChart_category .ct-chart', {
      
      labels: data.labels,
      series: [data.category.total_count]

    }, {
      axisY: {
        showLabel: false,
        showGrid: true
      },
      axisX: {
        showLabel: true,
        showGrid: true
      },
      stackBars: true,
      showGridBackground: false,
      height: 500
    }, [
      // Options override for media > 400px
      ['screen and (max-width: 767px)', {
        horizontalBars: true,
        stackBars: true,
        axisY: {
          // labelInterpolationFnc: function(value) {
          //   return (value / 1000) + 'k';
          // },
          // showLabel: false,
          // showGrid: true
        },
        axisX: {
          // labelInterpolationFnc: function(value) {
          //   return (value / 1000) + 'k';
          // },
          // showLabel: false,
          // showGrid: true
        }
      }]
      // Options override for media > 800px
      // ['screen and (min-width: 800px)', {
      //   stackBars: false,
      //   seriesBarDistance: 10
      // }],
      // Options override for media > 1000px
      // ['screen and (min-width: 1000px)', {
      //   reverseData: false,
      //   horizontalBars: false,
      //   seriesBarDistance: 15
      // }]
    ]).on('draw', function(d) {

      if(d.type === 'bar') {
        // window.console.log("Data:", d);
        // window.console.log("Data Blah:", data.labels[d.index]);

        $('.ct-bar').on('click', function() {
          window.console.log("Click", data.labels[d.index]);
          // $('#tooltip').html('<b>Selected Value: </b>' + $(this).attr('ct:value'));
        });

        // var x = d.type === 'bar' ? d.x2 : d.x;
        // var y = d.type === 'bar' ? d.y2 : d.y;
        
        // d.group.elem('text', {
        //   x: x + 10,
        //   y: y + 5,
        //   transform: 'rotate(-90, ' + x + ', ' + y + ')'
        // }, 'ct-label').text(data.labels[d.index]);


        // d.group.elem('rect', {
        //   x: x + 10,
        //   y: y + 5,
        //   width: 50,
        //   height: 50,
        //   transform: 'rotate(-90, ' + x + ', ' + y + ')'
        // }, 'ct-blah');


        d.element.attr({
          style: 'stroke-width: 40px',
          title: data.labels[d.index]
        });
      }
    });

    new Chartist.Bar('#analysisChart_status .ct-chart', {
      
      labels: data.labels,
      series: [data.status.forprofit, data.status.nonprofit]

    }, {
      axisY: {
        showLabel: false,
        showGrid: true
      },
      axisX: {
        showLabel: true,
        showGrid: true
      },
      stackBars: true,
      showGridBackground: false,
      height: 500
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
      axisY: {
        showLabel: false,
        showGrid: true
      },
      axisX: {
        showLabel: true,
        showGrid: true
      },
      stackBars: true,
      showGridBackground: false,
      height: 500
    }).on('draw', function(data) {
      if(data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 40px'
        });
      }
    });


    $('a[href$="#innovatorAnalysis"]').on('show.bs.tab', function(e) {
      // $(window).trigger('resize');
      // window.fireEvent('resize');
      window.dispatchEvent(new Event('resize'));
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
          forprofit = filtered.filter("[data-business-model='Nonprofit']").length,
          nonprofit = filtered.filter("[data-business-model='For-Profit']").length,
          prevention = filtered.filter("[data-food-recovery-hierarchy-option='Prevention']").length,
          recovery = filtered.filter("[data-food-recovery-hierarchy-option='Recovery']").length,
          recycling = filtered.filter("[data-food-recovery-hierarchy-option='Recycling']").length;

      data.labels.push(label);
      data.category.total_count.push(total_count);
      data.status.forprofit.push(forprofit);
      data.status.nonprofit.push(nonprofit);
      data.hierarchy.prevention.push(prevention);
      data.hierarchy.recovery.push(recovery);
      data.hierarchy.recycling.push(recycling);
    });


    window.console.log("Analysis Data: ", data);

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
