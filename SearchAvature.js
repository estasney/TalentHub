function SearchAvature(){

    var avature_start = "https://cisco.avature.net/#People/Id:1/Filters:{\"entityTypeId\":2,\"set\":{\"filters\":[{\"name\":\"keywords\",\"op\":\"matches\",\"value\":{\"extension\":{\"type\":\"everything\"},\"main\":\""
    var avature_end = "\"}}],\"isAnd\":true}}"
    var boolBox = ProcessBoolBox();
    //var boolBox = ProcessBoolBox().join(' ').replace(/ /g, '');
    

    for(i=0; i<boolBox.length; i++){
        //Remove the ascii value for space 
        if (boolBox[i].indexOf('%20') > -1){
           continue;
        }
        //Single word found - remove double quotes
        else if (boolBox[i].indexOf('"') > -1){
            boolBox[i] = boolBox[i].slice(1, -1).trim();
        }
        //Parentheses
        else{
            boolBox[i] = boolBox[i].trim();
        }

    }

    var search = boolBox.join(' ').replace(/ /g, '').replace(/%20/gi, ' ').replace(/"/gi, '\\"').trim();;

    var avature_url = avature_start + search + avature_end;

    //POP UP Message to see what we are trying to send
    alert(avature_url)


    var win = window.open(avature_url, '_blank');
    if (win) {

        //Browser has allowed it to be opened
        win.focus();

    } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
    }
    
}