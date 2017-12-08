
URL = "http://student04.cse.nd.edu:51033/"

function get_player_id(name){
    var res = name.split(" ");
    var firstName = res[0].toLowerCase();
    var lastName = res[1].toLowerCase();
    //console.log(firstName);
    //console.log(lastName);
    var req = new XMLHttpRequest()
    var get_player_url = URL.concat("players/");
    req.open("GET", get_player_url, true);
    req.onload = function(e){
        response = JSON.parse(req.responseText);
        for (var player in response['players']){
            if (firstName == response['players'][player]['firstName'].toLowerCase() &&
                lastName == response['players'][player]['lastName'].toLowerCase()){
                    //console.log(response['players'][player]);
                    return response['players'][player]['playerId'];
            }
        }
    }
    req.onerror = function(e){
        console.error(req.statusText);
    }
    req.send(null);
}

function get_team_id(name){
    name = name.toLowerCase();
    var req = new XMLHttpRequest()
    var get_team_url = URL.concat("teams/");
    var tid;
    req.open("GET", get_team_url, true);
    req.onload = function(e){
        response = JSON.parse(req.responseText);
        //console.log(response);
        for (var team in response['teams']){
            var curr = response['teams'][team];
            if (name == curr['teamName'].toLowerCase() ||
                name == curr['simpleName'].toLowerCase() ||
                name == curr['abbreviation'].toLowerCase() ||
                name == curr['location'].toLowerCase()){
                //console.log(typeof(curr['teamId']));
                tid = response['teams'][team]['teamId'];
                //console.log("HI");
                console.log(tid);
                return tid;
                //break;
                //return (tid);
            }
        }
    }
    req.onerror = function(e){
        console.error(req.statusText);
    }
    console.log(tid);
    req.send(tid);
    console.log("in function, tid: ");
    console.log(req.send);
}

function submit(){
    var name = document.getElementById('first').value.toLowerCase();
    var teamName = document.getElementById('team').value.toLowerCase();
    var pid = get_player_id(name);
    var tid = get_team_id(teamName);
    var req = new XMLHttpRequest()
    console.log("HEY");
    console.log(typeof(pid));
    console.log(tid);
    console.log("after TID");

}
Label.prototype = new Item();
Button.prototype = new Item();
Div.prototype = new Item();
Input.prototype = new Item();

var nameLabel = new Label();
var firstInput = new Input();
var teamInput = new Input();
var submitButton = new Button();
var searchDiv = new Div();
var displayDiv = new Div();

nameLabel.createLabel("Name", "nameLabel");
nameLabel.addToDocument();

firstInput.createInput('first');
firstInput.addToDocument();
//console.log("hi");
teamInput.createInput('team');
teamInput.addToDocument();

document.getElementById('first').value = "Kyrie Irving";
document.getElementById('team').value = "Brooklyn Nets";


submitButton.createButton("Submit", "submitButton");
submitButton.addClickEventHandler(submit, firstInput.value);
submitButton.addToDocument();

searchDiv.createDiv("searchDiv");
searchDiv.addToDiv(firstInput);
searchDiv.addToDiv(teamInput);
searchDiv.addToDiv(submitButton);
searchDiv.addToDocument();
