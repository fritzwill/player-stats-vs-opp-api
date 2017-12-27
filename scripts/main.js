
URL = "http://student04.cse.nd.edu:51033/"
var teamIds = {};
var playerIds = {};

function get_player_id(name){
    var req = new XMLHttpRequest()
    var get_player_url = URL.concat("players/");
    req.open("GET", get_player_url, true);
    req.onload = function(e){
        response = JSON.parse(req.responseText);
        for (var player in response['players']){
            var curr = response['players'][player];
            playerIds[curr['playerId']] = [curr['firstName'], curr['lastName']];
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
        for (var team in response['teams']){
            var curr = response['teams'][team];
            //console.log(team);
            teamIds[curr['teamId']] = [curr['teamName'].toLowerCase(), curr['simpleName'].toLowerCase(), curr['abbreviation'].toLowerCase(), curr['location'].toLowerCase()];
        }
    }
    req.onerror = function(e){
        console.error(req.statusText);
    }
    req.send(null);
}

function get_pid(name){
    var res = name.split(" ");
    var firstName = res[0].toLowerCase();
    var lastName = res[1].toLowerCase();
    for (var pl in playerIds){
        if (firstName == playerIds[pl][0].toLowerCase() && lastName == playerIds[pl][1].toLowerCase()){
            return pl;
        }
    }
}

function get_tid(teamName){
    var tl = teamName.toLowerCase();
    for (var t in teamIds){
        for(var x = 0; x < 4; x++){
            if (tl == teamIds[t][x]){
                return t;
            }
        }
    }
}

function post(){
    var name = document.getElementById('first').value.toLowerCase();
    var teamName = document.getElementById('team').value.toLowerCase();
    get_player_id(name);
    get_team_id(teamName);
    var req = new XMLHttpRequest()
    var pid1 = get_pid(name);
    var tid1 = get_tid(teamName);
    console.log("HI");
    console.log(typeof(pid1));
    console.log(typeof(tid1));
    console.log("BYE");
    if (typeof pid1 == 'undefined' || typeof tid1 == 'undefined'){
        // player or team not found
        return;
    }
    console.log(pid1);
    console.log(tid1);
    var data ={'pId' : pid1, 'tId' : tid1};
    var json = JSON.stringify(data);
    console.log(json)
    var post_url = URL.concat("pvo/");
    req.open("POST", post_url, true);
    req.onload = function(e){
        response = JSON.parse(req.responseText);
    }
    req.onerror = function(e){
        console.error(req.statusText);
    }
    req.send(json);


}

function submit(){
    var name = document.getElementById('first').value.toLowerCase();
    var teamName = document.getElementById('team').value.toLowerCase();
    var pid1 = get_pid(name);
    var tid1 = get_tid(teamName);
    var req1 = new XMLHttpRequest()
    var post_url = URL.concat("pvo/");
    var get_pvo_url = post_url.concat(pid1);
    var final_url = get_pvo_url.concat(tid1);
    req1.open("GET", final_url, true);
    req1.onload = function(e){
        response = JSON.parse(req1.responseText);
        console.log(response);
        updateText(response['data']);
    }
    req1.onerror = function(e){
        console.log("on error");
        console.error(req.statusText);
    }
    req1.send(null);
}

function updateText(args){
    if (typeof args == 'undefined'){
        return;
    }
    var body, tab, tr, td, tn, row, col, th;
    /* Get the body, remove the table in the body, create new table
       This is done so that the rows do not have to be counted and they can all be removed at once */
    body = document.getElementsByTagName("body")[0];
    body.removeChild(body.lastChild);
    tab = document.createElement("table");

    tr = document.createElement('tr');
    td = document.createElement('th');
    tn = document.createTextNode('Player Name');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('Matchup');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('Date');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('W/L');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('MIN');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('PTS');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('AST');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('FGM');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('FGA');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('FG%');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('3PM');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('3PA');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('3P%');
    td.appendChild(tn);
    tr.appendChild(td);
    td = document.createElement('th');
    
    tn = document.createTextNode('FTM');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('FTA');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('FT%');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('OREB');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('DREB');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('REB');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('TOV');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('STL');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('BLK');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('FOULS');
    td.appendChild(tn);
    tr.appendChild(td);

    td = document.createElement('th');
    tn = document.createTextNode('+/-');
    td.appendChild(tn);
    tr.appendChild(td);

    tab.appendChild(tr);
    /* add a row for each of the games in the response */
    for( row = 0; row  < args.length; row++){
        tr = document.createElement('tr');

        td = document.createElement('td');
        tn = document.createTextNode(args[row][2]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][8]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][7].substr(0,9));
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][9]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][10].toFixed(2));
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][30]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][23]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][11]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][12]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][13]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][14]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][15]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][16]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][17]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][18]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][19]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][20]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][21]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][22]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][24]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][25]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][26]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][28]);
        td.appendChild(tn);
        tr.appendChild(td);

        td = document.createElement('td');
        tn = document.createTextNode(args[row][31]);
        td.appendChild(tn);
        tr.appendChild(td);

        tab.appendChild(tr);
    }
    body.appendChild(tab);
    console.log(args);
}

Label.prototype = new Item();
Button.prototype = new Item();
Div.prototype = new Item();
Input.prototype = new Item();
Header.prototype = new Item();
Paragraph.prototype = new Item();

var nameLabel = new Label();
var teamLabel = new Label();
var firstInput = new Input();
var playerId = new Input();
var pidLabel = new Label();
var tidLabel = new Label();
var teamInput = new Input();
var teamId = new Label();
var submitButton = new Button();
var postButton = new Button();
var nameDiv = new Div();
var teamDiv = new Div();
var searchDiv = new Div();
var displayDiv = new Div();
var tidInput = new Input();
var pidInput = new Input();
var header = new Header();
var paragraph = new Paragraph();



header.createHeader("Welcome to Tommy and Will's Stat Center", 'header1');
header.addToDocument();

paragraph.createParagraph("Enter a player's name and an opposing team to see that player's stats against that team from the current NBA Season. First, enter parameters, then press 'Post', then press 'View'", "para");
paragraph.addToDocument();

nameLabel.createLabel("Name", "first");
nameLabel.addToDocument();

teamLabel.createLabel("Team", "team");
teamLabel.addToDocument();

firstInput.createInput('first');
firstInput.addToDocument();

teamInput.createInput('team');
teamInput.addToDocument();

tidInput.createInput('tidInput');
tidInput.item.setAttribute('type', 'hidden');
tidInput.addToDocument();

pidInput.createInput('pidInput');
pidInput.item.setAttribute('type', 'hidden');
pidInput.addToDocument();


document.getElementById('first').value = "Kyrie Irving";
document.getElementById('team').value = "Mavericks";
get_player_id("Kyrie Irving");
get_team_id("Brooklyn Nets");




nameDiv.createDiv("nameDiv");
nameDiv.addToDiv(nameLabel);
nameDiv.addToDiv(firstInput);
nameDiv.addToDiv(pidInput);


teamDiv.createDiv("teamDiv");
teamDiv.addToDiv(teamLabel);
teamDiv.addToDiv(teamInput);
teamDiv.addToDiv(tidInput);



postButton.createButton("Post", "postButton");
postButton.addClickEventHandler(post, firstInput.value);
postButton.addToDocument();

submitButton.createButton("View", "submitButton");
submitButton.addClickEventHandler(submit, firstInput.value);
submitButton.addToDocument();

searchDiv.createDiv("searchDiv");
searchDiv.addToDiv(nameDiv);
searchDiv.addToDiv(teamDiv);
searchDiv.addToDiv(postButton);
searchDiv.addToDiv(submitButton);
searchDiv.addToDocument();
