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

$.behaviors('.quiz', quiz);

  function quiz(test) {
    test = $(test);
    var questions = test.find('.question');

    questions.each(function() {
      var $question = $(this);
      var $choices = $question.find('.checkbox input');

      $choices.on('change', function() {
        // disable all choices
        $choices.attr('disabled', true);

        // check answer
        checkAnswer($question);
      });
    });

    $(window).on('hide.bs.tab', function(e) {
      resetTest(test);
    });
  }

  function resetTest(test) {
    window.console.log("reset");
    var questions = test.find('.question'),
        choices = test.find('.choices'),
        answers = test.find('.checkbox');
    
    questions.addClass('incomplete');
    choices.removeClass('active');
    answers.removeClass('incorrect').find('input').attr('checked', false).attr('disabled', false);
  }
  function checkTest() {
    var incomplete = $('.incomplete').length;
    if(!incomplete) { gradeTest(); }
  }
  function gradeTest() {
    // Tally score
    var wrong = $('.incorrect').length;
    var score = 5 - wrong;
    var grade = score < 4 ? 'poor' : 'good'

    // Update DOM with message and score
    $('.grade').addClass(grade).find('.results_correct').text(score).end().show();

    // Mark as complete
    $('#date_label_quiz').addClass("complete");

    ga('send', 'event', 'quiz', 'Spotlight on Date Labeling', score);

  }
  function checkAnswer($question) {
    var $guess = $question.find('input[type="checkbox"]:checked');
    var test = $guess.parent().hasClass('correct');

    $question.find('.choices').addClass('active');

    if(!test){
      $guess.parent().addClass('incorrect');
    }
    $question.removeClass('incomplete');
    checkTest();
  }


})();

