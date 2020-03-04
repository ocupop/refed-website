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
    // window.console.log("initTab: tab on page");
    tab = $(tab);

    tab.on('shown.bs.tab', function (e) {
      var target = $(this).attr('data-target').replace(/^#/g, '');
      // window.console.log("shown.tab: ", target);

      // Update the body class
      setTabClass(target);

      // Update the hash
      setActiveTabInHash(target);

    });
  }


})();
