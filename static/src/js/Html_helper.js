function handle(e, input1, results_body) {
    e.preventDefault(); // Otherwise the form will be submitted
    getWords(input1, results_body);
}


function handle_bool(e, input1, results_body) {
    if (e.keyCode == 13) {
        e.preventDefault(); // Otherwise the form will be submitted
        var bool_word = document.getElementById(input1).value;
        //If there is a quote("") inside the box then do nothing because only first word or phrase can be used
        if (!bool_word.includes('"')) {
            //add the value from boolean box to search word box
            document.getElementById("input_word").value = bool_word;
            getWords(input1, results_body);
            document.getElementById(input1).value = '"' + bool_word + '"';
        }
    }

}



function getWords(input1, results_body) {
    var search_word = document.getElementById(input1).value;

    newConnectSearch = new ConnectObject(search_word, results_body);
    newConnectSearch.getResultButtons();
}


function setBoolFocus(radio_button) {
    //If statement handles the main radio button associated with the main bool string because it is out of scope

    switch(radio_button){
        case 'radio1':
                document.getElementById('radio2').checked = false;
                document.getElementById('bool_radio').checked = false;
                break;
        case 'radio2':
                document.getElementById('radio1').checked = false;
                document.getElementById('bool_radio').checked = false;
                break;
        default:
                document.getElementById('radio2').checked = false;
                document.getElementById('radio1').checked = false;
                break;
    }


    document.getElementById(radio_button).checked = true;
    var box = document.getElementById(radio_button).value;

    $("#bool1").css({
        "box-shadow": "0 0 5px rgba(255, 102, 0, 1)",
        "border": "1px solid rgba(255, 102, 0, 1)"
    });
    $("#bool2").css({
        "box-shadow": "0 0 5px rgba(255, 102, 0, 1)",
        "border": "1px solid rgba(255, 102, 0, 1)"
    });
    $("#bool_not").css({
        "box-shadow": "0 0 5px rgba(255, 102, 0, 1)",
        "border": "1px solid rgba(255, 102, 0, 1)"
    });
    $('#' + box).css({
        "box-shadow": "0 0 5px rgba(255, 102, 0, 1)",
        "border": "5px solid rgba(255, 102, 0, 1)"
    });

}
