var count = 0;
//Declare 3 global arrays to store the Boolean buttons
var boolButtonArrayMain = []
var boolButtonArrayNot = []
var boolButtonArrayOr = []

//Global variables for operator image sources
var or_src = "static/src/img/or2.png"
var and_src = "static/src/img/and2.png"
var not_src = "static/src/img/not2.png"
var left_src = "static/src/img/left_par.png"
var right_src = "static/src/img/right_par.png"

//Button Object for words and phrases returned from search
//var txtValue, btnType are string type
//btnType "RESULSTS" or "BOOLEAN".  Assigned to button.class attribute so CSS can differentiate between the two
class ButtonObject{
    constructor(txtValue, btnType){
        this.txtValue = txtValue;
        
        this.btnType = btnType;
        this.btnID = ""

        if(txtValue.includes('"')){
            //First if test if result button is a phrase or word
            this.isWord = false
        }else if(txtValue.includes(" ")){
            //if Value is seperated by a space then it is considered a phrase
            //Add Double quotes to beginning and end of phrase
            this.txtValue = '"' + this.txtValue + '"'
            this.isWord = false
        }else{
            //single word
            this.isWord = true;
        }

        //Construct the button and its attributes
        this.button = document.createElement("BUTTON");
        this.button.setAttribute("type", "button");
        this.button.setAttribute("class", btnType);
        this.button.innerHTML = this.txtValue;
        this.button.setAttribute("value", this.txtValue);
        


        //Set onClick() for Results Button or Boolean Button
        if(btnType == "RESULTS"){
            this.button.setAttribute("id", this.txtValue);
            this.btnID = this.txtValue;
            //Creates and add Boolen Button to Boolean Search Area
            this.button.setAttribute("onclick", "addBoolButton(this.id)");

        } else {
            //append "-b" flag at end to distinguish as BOOLEAN button.
            //Addition of count added to id guarantees a unique id for deletion when clicked
            var buttonID = txtValue + "-b" + count.toString();
            this.btnID = buttonID;
            count++

            this.button.setAttribute("id", buttonID);
            //Removes/Deletes the Boolan Button from the Boolean Search Area
            //Also removes the OR operator left of the button
            this.button.setAttribute("onclick", "removeBoolButton(this.id)");
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

    getButtonId(){
        return this.btnID;
    }
}


//Not a Class function because onClick attribute from Index Page can't reach it otherwise

//Determine which radio button is active and ..
//Gets the value of the resulting word and add it to the boolean search box
function addBoolButton(clicked_id) {
    var buttonClass = "btn btn-primary"
    var boolButton = new ButtonObject(clicked_id, buttonClass);
    //append "or-" to differentiate the ID of the Boolean button.  For removal when button is removed.
    var imgId = "or-" + boolButton.getButtonId();
    //Create the <img> tag to put OR operator
    var or_img = new OperatorObject(or_src, imgId);
    

    //Get the Boolen Box that has focus to put buttons in
    var bool_selected = document.querySelector('input[name = "input_radio"]:checked').value;
    
    //Check if button is already in Boolean Box
    var boolBox = document.getElementById(bool_selected).children;
    var found = false;

    if(boolBox.length == 0){
        document.getElementById(bool_selected).appendChild(boolButton.getButton());
        found = true;
    }else{

        for(var i = 0; i< boolBox.length; i++){
            if(boolBox[i].innerHTML == clicked_id){
                found = true;
                break;
            }
        }
    }

    if(!found){
        document.getElementById(bool_selected).appendChild(or_img.getOperatorImg());
        document.getElementById(bool_selected).appendChild(boolButton.getButton());
    }
 

    
    //document.getElementById(bool_selected).appendChild(boolButton.getButton());
    //document.getElementById(id).appendChild(i);
    
    
}


//Determine if first Button is click.  If so, then remove it and the img OR operator to its right
function removeBoolButton(clicked_id) {
    
    //Get Parent Node id of clicked button to determine what box the button is located
    var nodeParent = document.getElementById(clicked_id).parentElement.getAttribute("id")
    //Get list of items in Boolean Box
    var boolBox = document.getElementById(nodeParent).children;
  

    //Compare clicked button is equal to the first item in the Boolean Box.  If it is then remove the button and the OR operator to its right
    if(boolBox[0].getAttribute("id") == clicked_id && boolBox.length >= 2){
        boolBox[0].remove();
        boolBox[0].remove();
    }else if(boolBox.length == 1){
        boolBox[0].remove();
    }else{
        var button = document.getElementById(clicked_id);
        button.remove();
        //Need TODO, remove OR operator img
        var id = "or-" + clicked_id;
        var img = document.getElementById(id);
        img.remove();
    }


}


class OperatorObject{
    constructor(src, id){
        this.src = src;
        this.id = id;

        //Construct the Operator and Parenthesis img object
        this.operator_img = document.createElement("img");
        this.operator_img.setAttribute("src", this.src);
        this.operator_img.setAttribute("height", "30");
        this.operator_img.setAttribute("id", this.id);
    }

    getOperatorImg(){
        return this.operator_img;
    }
}
