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

$.behaviors('.tableofcontents', toc);
$.behaviors('[class^="toc-entry"]', tocLink);

  function toc(container) {
    container = $(container);
    var content = $('main');

    content.find(':header').each(function() {
      var heading = $(this),
          heading_type = heading.get(0).tagName.toLowerCase(),
          text = heading.text(),
          label = heading.data('label'),
          label_class = "toc-entry toc-"+ heading_type,
          assign_label = label ? label : text,
          id = heading.attr('id'),
          new_id = id ? id : text.replaceAll(" ", "-").toLowerCase();
      
      heading.attr('id', new_id);
      if(heading.data('label-class')){ 
        label_class += " "+heading.data('label-class');
      }

      list_item = '<li><a href="#'+new_id+'" class="'+label_class+'" title="'+assign_label+'">'+assign_label+'</a></li>'
      container.append(list_item);

    });

  }

  function tocLink(link) {
    link = $(link);
    var target = link.attr('href');
    var offset = $('#toolHeader').height() + 10;
    window.console.log("toc.js: offset", offset);

    link.on('click', function() {
      window.console.log("toc.js: offset on click", offset);
      pageScroll(target, offset);
    });

  }


})();
