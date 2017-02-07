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

$.behaviors('.mapnav', initMapNav);

  function initMapNav(mapNav) {
    // TODO - Refactor based on relation to .mapnav
    // $('#policy-tool').on('click', function() {
    //   $('#map-instructions').addClass('hide');
    // });
    
    var targetMap = $(mapNav).data('target');

    $('.map-filter, .map-subfilter').on('change', function(e) {
      var checked = $(this).prop("checked"),
          container = $(this).parent(),
          siblings = container.siblings();
      // window.console.log("CONTAINER: ", container);

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
        window.console.log ($(this), bp);

        if(checked) {
          var showStudies = $el.find('.study-filter:checked').length;
          var section = $(this).closest('.section_root').attr('data-section');
          var activeClass = "map " + cat + " " + section;
          
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

})();
