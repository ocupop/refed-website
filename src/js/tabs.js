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

$.behaviors('[data-toggle="tab"]', initTab);

  function initTab(tab) {
    tab = $(tab);

    tab.on('shown.bs.tab', function (e) {
      var hash = e.target.hash;
      var data = {
        activeTab: e.target.hash
      };
      if (typeof hash != 'undefined' && hash != '') {
        if (history && history.pushState) {
          window.history.pushState(data, 'ReFED', window.location.pathname + window.location.search + hash);
        } else {
          scrollV = document.body.scrollTop;
          scrollH = document.body.scrollLeft;
          window.location.hash = hash;
          document.body.scrollTop = scrollV;
          document.body.scrollLeft = scrollH;
        }
      }
    });
  }

})();
