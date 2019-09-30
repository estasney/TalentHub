var geo_array = [];

function get_geoArray() {
    return geo_array;
}

function init_geoArray() {
    geo_array = [];
}

function init_Typeahead() {
    //<!-- Company names typeahead autocomplete -->

    var language = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: 'https://estasney.github.io/TalentHub/data/companies.json'


    });

    $('#typeaheadmulti_company .typeahead').typeaheadmulti({
        hint: true,
        highlight: true,
        minLength: 2
    }, {
        name: 'language',
        source: language,
        limit: 20

    });

    //Accept typed input when user presses the Return key
    $('#typeaheadmulti_company .typeahead').on('keydown', function(e) {
        if (e.keyCode == 13) {

            var myVal = e.target.value;


            if (myVal) {
                //Append <li> and bind the click function to remove from list
                $("#typeaheadmulti_company .ttmulti-selections").append("<li>" + myVal + '<i class="js-remove">✖</i>' + "</li>").find(".js-remove").bind("click", function() {
                    this.parentNode.remove()
                });
                $('#typeaheadmulti_company .typeahead').typeahead('close');
                $('#typeaheadmulti_company .typeahead').typeahead("val", "");
                //e.target.value = "";
            }
        }
    });



    //<!-- Job Titles typeahead autocomplete -->

    var language = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: 'https://estasney.github.io/TalentHub/data/titles_ex.json'


    });

    $('#typeaheadmulti_title .typeahead').typeaheadmulti({
        hint: true,
        highlight: true,
        minLength: 2
    }, {
        name: 'language',
        source: language,
        limit: 20
    });

    //Accept typed input when user presses the Return key
    $('#typeaheadmulti_title .typeahead').on('keydown', function(e) {
        if (e.keyCode == 13) {

            var myVal = e.target.value;

            if (myVal) {
                //Append <li> and bind the click function to remove from list
                $("#typeaheadmulti_title .ttmulti-selections").append("<li>" + myVal + '<i class="js-remove">✖</i>' + "</li>").find(".js-remove").bind("click", function() {
                    this.parentNode.remove()
                });
                $('#typeaheadmulti_title .typeahead').typeahead('close');
                $('#typeaheadmulti_title .typeahead').typeahead("val", "");

            }
        }
    });


    //<!-- Geographic Area typeahead autocomplete -->






    var geoArea = new Bloodhound({
        datumTokenizer: function(datum) {
            return Bloodhound.tokenizers.whitespace(datum.description);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
            url: 'https://estasney.github.io/TalentHub/data/codes.json',
            cache: false,
            transform: function(response) {
                return $.map(response, function(item) {
                    return {
                        code: item.code,
                        description: item.description
                    };
                });
            }
        }
    });

    // instantiate the typeahead UI
    $('#typeaheadmulti_geo .typeahead').typeaheadmulti({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: 'engine',
        source: geoArea,
        display: 'description',
        limit: 20

    });

    // Store the selected Geoarea and Code into array for processing
    $('#typeaheadmulti_geo .typeahead').bind('typeahead:select', function(ev, suggestion) {
        var geo_selected = suggestion.description + suggestion.code;
        geo_array.push(geo_selected);
        console.log(geo_array);
        console.log('Selection: ' + suggestion.code);
    });
}
