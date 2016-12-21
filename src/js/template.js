/* Ocupop, ocupop.com */

(function() {

$.behaviors('.dependentSelect', dependentSelect);

function dependentSelect(select) {
    select = $(select);
    var controllerField = $(select.data('controller'));
    var originalOptions = $('option', select).clone();

    controllerField.change(updateChoices);
    updateChoices();

    function updateChoices() {
        var currentValue = controllerField.val();
        $('option', select).remove();
        originalOptions.each(function() {
            option = $(this);
            if(option.data('enabledFor') === undefined || option.data('enabledFor') == currentValue) {
                select.append(option.clone());
            }
        });
    }
}

})();
