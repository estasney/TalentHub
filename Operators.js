

function add_operators(opt_buttons){

  //var opt_names = ['AND', 'OR', 'NOT', '"', '(', ')' ]

//AND
  var x = document.createElement("INPUT");
  x.setAttribute("type", "button");
  x.setAttribute("class", "operator_buttons");
  x.setAttribute("value", "AND");
  x.setAttribute("id", "opt_and");
  x.setAttribute("onclick", "appendValue(this.id)");
  document.getElementById(opt_buttons).appendChild(x);
//OR
  var x = document.createElement("INPUT");
  x.setAttribute("type", "button");
  x.setAttribute("class", "operator_buttons");
  x.setAttribute("value", "OR");
  x.setAttribute("id", "opt_or");
  x.setAttribute("onclick", "appendValue(this.id)");
  document.getElementById(opt_buttons).appendChild(x);
//NOT
  var x = document.createElement("INPUT");
  x.setAttribute("type", "button");
  x.setAttribute("class", "operator_buttons");
  x.setAttribute("value", "NOT");
  x.setAttribute("id", "opt_not");
  x.setAttribute("onclick", "appendValue(this.id)");
  document.getElementById(opt_buttons).appendChild(x);
//"
var x = document.createElement("INPUT");
x.setAttribute("type", "button");
x.setAttribute("class", "operator_buttons");
x.setAttribute("value", '"');
x.setAttribute("id", "opt_quote");
x.setAttribute("onclick", "appendValue(this.id)");
document.getElementById(opt_buttons).appendChild(x);
//(
var x = document.createElement("INPUT");
x.setAttribute("type", "button");
x.setAttribute("class", "operator_buttons");
x.setAttribute("value", '(');
x.setAttribute("id", "opt_left");
x.setAttribute("onclick", "appendValue(this.id)");
document.getElementById(opt_buttons).appendChild(x);
//)
var x = document.createElement("INPUT");
x.setAttribute("type", "button");
x.setAttribute("class", "operator_buttons");
x.setAttribute("value", ')');
x.setAttribute("id", "opt_right");
x.setAttribute("onclick", "appendValue(this.id)");
document.getElementById(opt_buttons).appendChild(x);
//firstname:
var x = document.createElement("INPUT");
x.setAttribute("type", "button");
x.setAttribute("class", "operator_buttons");
x.setAttribute("value", 'firstname:');
x.setAttribute("id", "opt_first");
x.setAttribute("onclick", "appendValue(this.id)");
document.getElementById(opt_buttons).appendChild(x);
//lastname:
var x = document.createElement("INPUT");
x.setAttribute("type", "button");
x.setAttribute("class", "operator_buttons");
x.setAttribute("value", 'lastname:');
x.setAttribute("id", "opt_last");
x.setAttribute("onclick", "appendValue(this.id)");
document.getElementById(opt_buttons).appendChild(x);
//title:
var x = document.createElement("INPUT");
x.setAttribute("type", "button");
x.setAttribute("class", "operator_buttons");
x.setAttribute("value", 'title:');
x.setAttribute("id", "opt_title");
x.setAttribute("onclick", "appendValue(this.id)");
document.getElementById(opt_buttons).appendChild(x);
//company:
var x = document.createElement("INPUT");
x.setAttribute("type", "button");
x.setAttribute("class", "operator_buttons");
x.setAttribute("value", 'company:');
x.setAttribute("id", "opt_company");
x.setAttribute("onclick", "appendValue(this.id)");
document.getElementById(opt_buttons).appendChild(x);
//school:
var x = document.createElement("INPUT");
x.setAttribute("type", "button");
x.setAttribute("class", "operator_buttons");
x.setAttribute("value", 'school:');
x.setAttribute("id", "opt_school");
x.setAttribute("onclick", "appendValue(this.id)");
document.getElementById(opt_buttons).appendChild(x);





}

function appendValue(clicked_id) {
  var txt = document.getElementById(clicked_id).value;
  search = document.getElementById("what").value;

  switch(txt) {
    case 'AND':
    case 'OR':
    case 'NOT':
    case '(':
      search = search + " " + txt;
      document.getElementById("what").value = search;
      document.getElementById("what").focus();
      break;
    case 'firstname:':
    case 'lastname:':
    case 'title:':
    case 'company:':
    case 'school:':
      if(!search.includes(txt)){
        search = search + " " + txt;
        document.getElementById("what").value = search;
        document.getElementById("what").focus();
      }
      break;
    case '"':
    case ')':
      search = search + txt;
      document.getElementById("what").value = search;
      document.getElementById("what").focus();
      break;
    default:
      break;
    }
  }
