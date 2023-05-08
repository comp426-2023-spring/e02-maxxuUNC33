let isResultVisible;

function toggleShotsVisibility() {
    const opponentCheckbox = $('#opponent');
    const rpsCheckbox = $('#rps');
    const rpslsCheckbox = $('#rpsls');

    if (opponentCheckbox.prop('checked')) {
        $('.shots').show();
    } else {
        $('.shots').hide();
    }

    if (rpsCheckbox.prop('checked') && opponentCheckbox.prop('checked')) {
        $("#lizard, #spock, #lizard_label, #spock_label").hide();
    }
    if (rpslsCheckbox.prop('checked') && opponentCheckbox.prop('checked')) {
        $("#lizard, #spock, #lizard_label, #spock_label").show();
    }
}

function resetGame() {
    $("#userinput").show();
    $('#userinput').trigger('reset');
    toggleShotsVisibility();
    isResultVisible = false;
    updateResultsVisibility();
}

function updateResultsVisibility() {
    const elementsToToggle = $("#you, #game_opponent, #game_result, #startover2");

    if (isResultVisible) {
        elementsToToggle.css("visibility", "visible");
    } else {
        elementsToToggle.css("visibility", "hidden");
    }
}

async function playGame() {
    const game = $('input[type=radio][name=game]:checked').val();
    const shot = $('input[type=radio][name=shot]:checked').val();
    const baseUrl = window.location.href + 'app/';
    const url = baseUrl + game + '/play/' + shot;
    const response = await fetch(url);
    const result = await response.json();

    $("#userinput").hide();
    isResultVisible = true;
    updateResultsVisibility();

    $("#you").html("You: " + result.player);
    $("#game_opponent").html("Opponent: " + result.opponent);
    $("#game_result").html("Result: " + result.result);
}

function displayRules() {
    $("#rps_rules, #rpsls_rules, #close").css("visibility", "visible");
}

function hideRules() {
    $("#rps_rules, #rpsls_rules, #close").css("visibility", "hidden");
}
