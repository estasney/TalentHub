
//Button Object for words and phrases returned from search
//var txtValue, btnType are string type
//btnType "RESULSTS" or "BOOLEAN".  Assigned to button.class attribute so CSS can differentiate between the two
class ButtonObject{
    constructor(txtValue, btnType){
        this.txtValue = txtValue.word.replace("_", " ");
        
        this.btnType = btnType;

        if(txtValue.includes(" ")){
            //if Value is seperated by a space then it is considered a phrase
            //Add Double quotes to beginning and end of phrase
            this.isWord = false
        }else {
            //single word
            this.isWord = true;
        }
        //Construct the button and its attributes
        var button = document.createElement("BUTTON");
        button.setAttribute("type", "button");
        button.setAttribute("class", btnType);
        button.innerHTML = txtValue;
        button.setAttribute("value", txtValue);
        //Set attr "id" to txtValue because it is unique. Identical words or phrases should not be returned from JSON request
        button.setAttribute("id", txtValue);


        //Set onClick() for Results Button or Boolean Button
        if(btnType == "RESULTS"){
            //Creates and add Boolen Button to Boolean Search Area
            button.setAttribute("onclick", "addBoolButton(this.id)");
        } else {
            //Removes/Deletes the Boolan Button from the Boolean Search Area
            //Also removes the OR operator left of the button
            button.setAttribute("onclick", "removeBoolButton(this.id)");
        }



    }


    getTxtValue(){
        return this.getTxtValue;
    }

    getIsWord(){
        return this.isWord;
    }
    
    getButton(){
        return this.button;
    }

    getButtonType(){
        return this.btnType;
    }
}


//Not a Class function because onClick attribute from Index Page can't reach it otherwise

//Determine which radio button is active and ..
//Gets the value of the resulting word and add it to the boolean search box
function addBoolButton(clicked_id) {
    var txt = document.getElementById(clicked_id).value;
    txt = '"' + txt + '"';
    var bool_selected = document.querySelector('input[name = "input_radio"]:checked').value;
    //Get current value of text box that has focus
    search = document.getElementById(bool_selected).value;


    switch (bool_selected) {
        //Test the main boolean textarea for generated boolean string.  If exist then do not accept input from keyword buttons
        case 'bool1':
            if (search) {
                if (search[0] == '(') {
                    break;
                }
            }

        default:
            if (!search.includes(txt)) {
                if (search) {
                    search = search + " " + "OR" + " " + txt;
                    document.getElementById(bool_selected).value = search;
                } else {
                    search = txt;
                    document.getElementById(bool_selected).value = search;
                }
            }
    }
}


//Deletes the Boolean Button when clicked
function removeBoolButton(clicked_id) {
    var button = document.getElementById(clicked_id);
    button.remove();
    //Need TODO, remove OR operator img

}



