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


  function innovatorDatabase_categories(menu) {
    menu = $(menu);

    $('[data-chart]').on('click', function() {
      var chart = $(this).attr('data-chart');

      if($(this).hasClass('active')) {
        $('#analysisChart_category').addClass('active');
        $(chart).removeClass('active');

        $(this).removeClass('active');
        $(chart).removeClass('active');
      } else {
        $('[data-chart]').not(this).removeClass('active');
        $(this).addClass('active');

        $('.analysisChart').not(chart).removeClass('active');
        $(chart).addClass('active');
      }

      
    });

    $('[data-target="#innovatorAnalysis"]')
        .on('shown.bs.tab', function(e) {
          window.scrollTo(0, 0);
          // Fix for hidden content in tab
          var target = "#" + $(this).attr('data-target').replace(/^#/g, '');
          $(target).find('.ct-chart').each(function(el, tab) {
            // Resize Charts on tab load
            tab.__chartist__.update();
          });

          $('.innovatorDatabase_menu section').removeClass('active');
          menu.addClass('active');
        })
        .on('hide.bs.tab', function(e) {
          menu.removeClass('active');
        });

  }


  function initCharts(container) {

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
      // Options override for media > mobile
      ['screen and (max-width: 767px)', {
        horizontalBars: true,
        stackBars: true
      }]
    ]).on('draw', function(d) {

      if(d.type === 'bar') {
        // window.console.log("Data:", d);
        // window.console.log("Data Blah:", data.labels[d.index]);

        var x = d.type === 'bar' ? d.x1 : d.x;
        var y = d.type === 'bar' ? d.y1 : d.y;
        
        d.group.elem('text', {
          x: x + 10,
          y: y + 5
          // transform: 'rotate(-90, ' + x + ', ' + y + ')'
        }, 'ct-label').text(data.labels[d.index]);

        d.element.attr({
          style: 'stroke-width: 40px',
          title: data.labels[d.index],
          summary: data.details[d.index],
          category: data.labels[d.index].toLowerCase().replace(' ', '-'),
          onclick: "showAnalysisDetails(this)"
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
    }, [
      // Options override for media > mobile
      ['screen and (max-width: 767px)', {
        horizontalBars: true,
        stackBars: true
      }]
    ]).on('draw', function(d) {
      if(d.type === 'bar') {

        d.element.attr({
          style: 'stroke-width: 40px',
          title: data.labels[d.index],
          summary: data.details[d.index],
          category: data.labels[d.index].toLowerCase().replace(' ', '-'),
          onclick: "showAnalysisDetails(this, '.status')"
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
    }, [
      // Options override for media > mobile
      ['screen and (max-width: 767px)', {
        horizontalBars: true,
        stackBars: true
      }]
    ]).on('draw', function(d) {
      if(d.type === 'bar') {
        d.element.attr({
          style: 'stroke-width: 40px',
          title: data.labels[d.index],
          summary: data.details[d.index],
          category: data.labels[d.index].toLowerCase().replace(' ', '-'),
          onclick: "showAnalysisDetails(this, '.hierarchy')"
        });
      }
    });


  }

  function buildChartData() {
    var options = $('#innovator_categories option').not(":eq(0)");
    var data = {
      labels: [],
      details: [],
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
          summary = $(this).attr('data-summary');
          filter = $(this).val(),
          filtered = $(filter),
          total_count = filtered.length;
          forprofit = filtered.filter("[data-business-model='Nonprofit']").length,
          nonprofit = filtered.filter("[data-business-model='For-Profit']").length,
          prevention = filtered.filter("[data-food-recovery-hierarchy-option='Prevention']").length,
          recovery = filtered.filter("[data-food-recovery-hierarchy-option='Recovery']").length,
          recycling = filtered.filter("[data-food-recovery-hierarchy-option='Recycling']").length;

      data.labels.push(label);
      data.details.push(summary);
      data.category.total_count.push(total_count);
      data.status.forprofit.push(forprofit);
      data.status.nonprofit.push(nonprofit);
      data.hierarchy.prevention.push(prevention);
      data.hierarchy.recovery.push(recovery);
      data.hierarchy.recycling.push(recycling);
    });


    // window.console.log("Analysis Data: ", data);
    return data;

  }


  window.showAnalysisDetails = function(el, view) {
    window.console.log("showAnalysisDetails:", el);

    el = $(el);


    $('#tooltip')
      .find('.status, .hierarchy').hide().end()
      .find('[data-content="title"]').text(el.attr('title')).end()
      .find('[data-content="description"]').text(el.attr('summary')).end()
      .find('.innovator_details').hide().end()
      .find('.analysis_details').show().end()
      .find('.analysis_details a').each(function() {
        var h = $(this).attr('href').replace(/innovator_category=.*/,'innovator_category=');
        // window.console.log("HREF:", h);
        h += el.attr('category');
        $(this).attr('href', h);
      }).show().end()
      .find(view).show().end()
      .addClass('active');
  }


})();
