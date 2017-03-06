function openSearch(website, bool, title, company, geo_array) {

    var search = "";
    var search_opt = "";
    //Construct the boolean string with the AND operators
    switch (website) {

        case 'linkedin':
            //Replace space and quotes with unicode equivelent
            search = bool.replace(/ /g, '%20').replace(/"/g, '%22');

            if (title) {
                var str_title = title.replace(/ /g, '%20');
                console.log('Title array size: ' + title)
                //search = search + "%20AND%20" str_title;
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

    } //End switch


    /*
        //Check for optional search criteria Job Title and Company
        if (title) {
            var str_title = title.replace(/ /g, '%20').replace(/"/g, '%22');
            search_opt = "&title=" + str_title;
            if (company) {
                //Job Title and Company is present
                var str_company = company.replace(/ /g, '%20').replace(/"/g, '%22');
                search_opt = search_opt + "&company=" + str_company + "&openAdvancedForm=true&titleScope=CP&companyScope=CP&locationType=Y";
                search = search + search_opt;
            } else {
                //Only Job Title is present
                search_opt = search_opt + "&openAdvancedForm=true&titleScope=CP&locationType=Y";
                search = search + search_opt;
            }
        } else if (company) {
            //Only Company is present
            var str_company = company.replace(/ /g, '%20').replace(/"/g, '%22');
            search_opt = "&company=" + str_company + "&openAdvancedForm=true&companyScope=CP&locationType=Y";
            search = search + search_opt;
        } else {
          //No optional search criteria used
          search = search + "&openAdvancedForm=true&locationType=Y";
        }
    */

    //str = str.replace(/ /g, '%20').replace(/"/g, '%22').replace(/:/g, '%3A').replace(/\(/g, '%28').replace(/\)/g, '%29');

    //Process the geocode

    var array_size = geo_array.length;
    var geo_string = "";

    for (i = 0; i < array_size; i++) {
        var code = geo_array[i].split('.');
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


    //Append the Geographic code if present
    if (array_size >= 1) {
        //remove the trailing comma "%2C"
        geo_string = geo_string.slice(0, -3);

        geo_string = "?facetGeoRegion=%5B" + geo_string + "%5D";
        //var linkedin_url = "https://www.linkedin.com/vsearch/p?keywords=" + search + "&f_G=" + geo_area + "%3A" + geo_num + "&rsid=2132689341487064709807&orig=ADVS";
        //var linkedin_url = "https://www.linkedin.com/vsearch/p?keywords=" + search + "&f_G=" + geo_string + "&rsid=2132689341487064709807&orig=ADVS";
        var linkedin_url = "https://www.linkedin.com/search/results/people/" + geo_string + "&keywords=" + search + "&origin=FACETED_SEARCH";

    } else {
        //var linkedin_url = "https://www.linkedin.com/vsearch/p?keywords=" + search + "&rsid=2132689341487321114500&orig=ADVS";
        var linkedin_url = "https://www.linkedin.com/search/results/people/?keywords=" + search + "&origin=FACETED_SEARCH";

    }

    //var linkedin_url = "https://www.linkedin.com/vsearch/p?keywords=" + str + "&openAdvancedForm=true&locationType=Y&f_G=" + geo_area + "%3A" + geo_num + "&rsid=2132689341487064709807&orig=ADVS";
    var win = window.open(linkedin_url, '_blank');
    if (win) {

        //Browser has allowed it to be opened
        win.focus();

    } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
    }

}

//Generates the boolean string by combining the main boolean and the optional operators.
function generateBoolean(generate, bool1, bool2, bool3, bool4, bool_not) {

    var boolString = "";

    //Construct the boolean string with the AND operators
    switch (generate) {

        case 'generate':
            if (bool1) {
                if (bool1[0] == "(") {
                    str_bool1 = bool1;
                } else {
                    var str_bool1 = bool1.trim();
                    str_bool1 = "(" + str_bool1 + ")";
                }
            } else {
                break;
            }

            if (bool2) {
                var str_bool2 = bool2.trim();
                str_bool2 = "(" + str_bool2 + ")";
            } else {
                boolString = str_bool1;
                break;
            }

            if (bool3) {
                var str_bool3 = bool3.trim();
                str_bool3 = "(" + str_bool3 + ")";
            } else {
                boolString = str_bool1 + " AND " + str_bool2;
                break;
            }

            if (bool4) {
                var str_bool4 = bool4.trim();
                str_bool4 = "(" + str_bool4 + ")";
                boolString = str_bool1 + " AND " + str_bool2 + " AND " + str_bool3 + " AND " + str_bool4;
                break;
            } else {
                boolString = str_bool1 + " AND " + str_bool2 + " AND " + str_bool3;
                break;
            }
    } //End switch

    //Append the NOT to the boolean string if present
    if (bool_not) {
        var str_not = bool_not.trim();
        str_not = "(" + str_not + ")";
        boolString = boolString + " NOT " + str_not;
    }

    //Update the Boolean textarea with the generated boolean string
    document.getElementById('bool1').value = boolString;
    document.getElementById("bool2").value = "";
    document.getElementById("bool3").value = "";
    document.getElementById("bool4").value = "";
    document.getElementById("bool_not").value = "";

}


//Clear and resets all Boolean search box to empty
function clearBoolean() {

    document.getElementById("bool1").value = "";
    document.getElementById("bool2").value = "";
    document.getElementById("bool3").value = "";
    document.getElementById("bool4").value = "";
    document.getElementById("bool_not").value = "";
    document.getElementById("company").value = "";
    document.getElementById("title").value = "";
    document.getElementById("geoarea").value = "";
    document.getElementById("geocode").value = "";

    document.getElementById("radio1").checked = true;
    $("#bool2").css({
        "box-shadow": "",
        "border": ""
    });
    $("#bool3").css({
        "box-shadow": "",
        "border": ""
    });
    $("#bool4").css({
        "box-shadow": "",
        "border": ""
    });
    $("#bool_not").css({
        "box-shadow": "",
        "border": ""
    });

    $("#bool1").css({
        "box-shadow": "0 0 5px rgba(255, 102, 0, 1)",
        "border": "5px solid rgba(255, 102, 0, 1)"
    });

}
