function generateBoolean() {
    //Get all the values from the search fields and pass it to the search function
    //Get list of items in Boolean Box

    var boolBox1 = document.getElementById("bool1");
    var boolBoxAnd = document.getElementById("bool2");
    var boolBoxNot = document.getElementById("bool_not");

    //Check if Generate has already been press by deteriming if the first element has id left-par1
    if(boolBox1.firstElementChild.id != "left-par1"){

        //Construct the boolean string by adding the parentheses and the related Operators
        //Insert Parentheses and Operators accordingly
        var left_paren1 = new OperatorObject(left_src, "left-par1");
        var right_paren1 = new OperatorObject(right_src, "right-par1");
        boolBox1.insertBefore(left_paren1.getOperatorImg(), boolBox1.firstElementChild);
        boolBox1.appendChild(right_paren1.getOperatorImg());

        //Check if AND Bool Box is empty
        if(boolBoxAnd.firstChild){

            //Insert Parentheses and Operators accordingly
            var left_paren2 = new OperatorObject(left_src, "left-par2");
            var right_paren2 = new OperatorObject(right_src, "right-par2");
            var and_opp = new OperatorObject(and_src, "and-opp");
            boolBoxAnd.insertBefore(left_paren2.getOperatorImg(), boolBoxAnd.firstElementChild);
            boolBoxAnd.insertBefore(and_opp.getOperatorImg(), boolBoxAnd.firstElementChild);
            boolBoxAnd.appendChild(right_paren2.getOperatorImg());

            //Clone child element from boolBoxAnd and append to boolBox1
            while(boolBoxAnd.firstChild){
                var itm = boolBoxAnd.firstElementChild;
                var cln = itm.cloneNode(true);
                boolBox1.appendChild(cln);
                boolBoxAnd.removeChild(boolBoxAnd.firstChild);
            }
        }

        //Check if OR Bool Box is empty
        if(boolBoxNot.firstChild){

            //Insert Parentheses and Operators accordingly
            var left_paren3 = new OperatorObject(left_src, "left-par3");
            var right_paren3 = new OperatorObject(right_src, "right-par3");
            var not_opp = new OperatorObject(not_src, "not-opp");
            boolBoxNot.insertBefore(left_paren3.getOperatorImg(), boolBoxNot.firstElementChild);
            boolBoxNot.insertBefore(not_opp.getOperatorImg(), boolBoxNot.firstElementChild);
            boolBoxNot.appendChild(right_paren3.getOperatorImg());
   

            //Clone child element from boolBoxOr and append to boolBox1
            while(boolBoxNot.firstChild){
                var itm = boolBoxNot.firstElementChild;
                var cln = itm.cloneNode(true);
                boolBox1.appendChild(cln);
                boolBoxNot.removeChild(boolBoxNot.firstChild);
            }
        }

    }

    

}

//Clear and resets all Boolean search box to empty
function clearBoolean() {

    var bool1 = document.getElementById("bool1");
    while(bool1.firstChild){
        bool1.removeChild(bool1.firstChild);
    }
    var bool2 = document.getElementById("bool2");
    while(bool2.firstChild){
        bool2.removeChild(bool2.firstChild);
    }

    var bool_not = document.getElementById("bool_not");
    while(bool_not.firstChild){
        bool_not.removeChild(bool_not.firstChild);
    }
    
    
    $('#typeaheadmulti_title .ttmulti-selections').empty();
    $('#typeaheadmulti_company .ttmulti-selections').empty();
    $('#typeaheadmulti_geo .ttmulti-selections').empty();
    //Initialize geo_array to empty
    //var geoarray = get_geoArray();

    init_geoArray();
    //geoarray = get_geoArray();

    document.getElementById("radio1").checked = true;

   
}
