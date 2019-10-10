$.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
        //options.url = "http://cors.corsproxy.io/url=" + options.url;
    }
});


class ConnectObject{
    constructor(txtSearchWord, results_body){
        this.searchWord = txtSearchWord;
        this.results_body = results_body;
        this.url = "https://estasney.pythonanywhere.com/api/v1/related?q=" + this.searchWord + "&scope=words&n=20";
       
    }


    getResultButtons(){
        //this.results_body apparently out of scope of $.getJson method
        var body = this.results_body;
        //var arrayButton = new Array();
        document.getElementById("hubImage").style.display = 'none';

        //Removes all the Buttons created from the last call
        document.getElementById(body).innerHTML = "";

        //Add first keyword as button
        var resultButton = new ButtonObject(this.searchWord, "RESULTS");
        //arrayButton.push(resultButton);
        document.getElementById(body).appendChild(resultButton.getButton());
        

        //Gets the JSON info from external source
        $.getJSON(this.url, function(response) {
            //related is the dict in the returned json var response
            var items = response.items;
            items.forEach(function (item, index){
                var word = item.word.replace("_", " ");
                var newButton = new ButtonObject(word, "RESULTS");
                //arrayButton.push(resultButton);
                document.getElementById(body).appendChild(newButton.getButton());

            });

            $("#viewer").html(response);
        });

    }


}