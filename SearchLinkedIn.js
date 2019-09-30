function ProcessBoolBox(){

    var boolBox1 = document.getElementById("bool1").children;
    //Array to store txt value of each item in BoolBox1
    var txtValue = [];
    var space = "%20";

    //Get all the values inside main BoolBox1 to construct search string
    for(i=0; i<boolBox1.length; i++){
        var tag = boolBox1[i].tagName;
        console.log("TAG: ", tag)
        switch(tag){
            case "IMG":
                var txt = boolBox1[i].getAttribute("id").split("-");
                //Left Paren Img
                if(txt[0] == 'left'){
                    console.log("LEFT")
                    txtValue.push("(");
                //Right Paren Img
                }else if (txt[0] == 'right'){
                    console.log("RIGHT")
                    txtValue.push(")");
                //AND or NOT operator
                }else{
                    console.log("OP")
                    var opp = space + txt[0] + space;
                    txtValue.push(opp);
                }
                break
            default:
                //Check if Word or Phrase
                if (boolBox1[i].innerHTML.indexOf(' ') > -1){
                    var phrase = boolBox1[i].innerHTML.replace(' ', space);
                    txtValue.push(phrase);
                }else{
                    var word = '"' + boolBox1[i].innerHTML + '"';
                    txtValue.push(word);
                }   
                break;
            
        }


    }

    return txtValue;
}


function ProcessTitle(){

    //var title = document.getElementById("title").value;
    var title_list = document.getElementById("typeaheadmulti_title").getElementsByTagName("li");

    var title = '';
    if (title_list.length != 0) {
        for (i = 0; i < title_list.length; i++) {
            var title_item = title_list[i].innerHTML.split('<', 1);
            title_item = '"' + title_item + '"';
            if (i != (title_list.length - 1)) {
                title = title + "title:" + title_item + " OR ";
            } else {
                title = title + "title:" + title_item;
            }
            //title.push(title_item);
        }
        title = "(" + title + ")";
    }

    return title;
}

function ProcessCompany(){

    var company_list = document.getElementById("typeaheadmulti_company").getElementsByTagName("li");
    var company = '';
    if (company_list.length != 0) {
        for (i = 0; i < company_list.length; i++) {
            var company_item = company_list[i].innerHTML.split('<', 1);
            company_item = '"' + company_item + '"';
            if (i != (company_list.length - 1)) {
                company = company + "company:" + company_item + " OR ";
            } else {
                company = company + "company:" + company_item;
            }
            //title.push(title_item);
        }
        company = "(" + company + ")";
    }

    return company;
}

function ProcessGeoCode(){

    //Get Values from GeoArea list - returns a NodeList
    var geo_list = document.getElementById("typeaheadmulti_geo").getElementsByTagName("li");
    //var geo_array = get_geoArray();
    var code_array = [];

    console.log("GEOARRAY SIZE: ", geo_array.length)

    //geo_array is declared in Custom_typeahead.js

    //Compare GeoArea list to geo_array to process listed locations
    for (i = 0; i < geo_list.length; i++) {
        for (n = 0; n < geo_array.length; n++) {
            //list_item is an array that contains GeoArea name
            //split because geo_list contains hidden html tags <i>
            var geo_item = geo_list[i].innerHTML.split('<', 1);
            if (geo_array[n].includes(geo_item[0])) {
                var code = geo_array[n].slice(geo_item[0].length);
                code_array.push(code);
                break;

            }
        }
    }


    var array_size = code_array.length;
    var geo_string = "";

    for (i = 0; i < array_size; i++) {
        var code = code_array[i].split('.');
        if (code.length == 4) {
            var geo_area = code[1];
            var geo_num = code[3];
            geo_string = geo_string + '"' + geo_area + "%3A" + geo_num + '"' + "%2C";
        } else {
            var geo_area = code[1];
            var geo_num = '0';
            geo_string = geo_string + '"' + geo_area + "%3A" + geo_num + '"' + "%2C";
        }

    }

    return geo_string;

}

function SearchLinkedIn(){

    var boolBox = ProcessBoolBox().join(' ').replace(/ /g, '');
    var title = ProcessTitle();
    var company = ProcessCompany();
    var geo_string = ProcessGeoCode();

    var search = "";

    //Construct the boolean string with the AND operators
   
    //Replace space and quotes with unicode equivelent
    search = boolBox.replace(/ /g, '%20').replace(/"/g, '%22');

    if (title) {
        var str_title = title.replace(/ /g, '%20');

        if (company.length != 0) {
            //Job Title and Company is present
            var str_company = company.replace(/ /g, '%20');
            search = search + "%20AND%20" + str_title + "%20AND%20" + str_company;
        } else {
            //Only Job Title is present
            search = search + "%20AND%20" + str_title;
        }
    }
    else if(company.length != 0) {
        var str_company = company.replace(/ /g, '%20');
        search = search + "%20AND%20" + str_company;
    }


    //Append the Geographic code if present
    if (geo_string.length >= 1) {
        //remove the trailing comma "%2C"
        geo_string = geo_string.slice(0, -3);

        geo_string = "?facetGeoRegion=%5B" + geo_string + "%5D";
    
        var linkedin_url = "https://www.linkedin.com/search/results/people/" + geo_string + "&keywords=" + search + "&origin=FACETED_SEARCH";

    } else {
        var linkedin_url = "https://www.linkedin.com/search/results/people/?keywords=" + search + "&origin=FACETED_SEARCH";

    }

    var win = window.open(linkedin_url, '_blank');
    if (win) {

        //Browser has allowed it to be opened
        win.focus();

    } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
    }

}