
import requests
import json

from _player_vs_opp_database import _player_vs_opp_database




db = _player_vs_opp_database()
db.load_players("data/players.json")
db.load_teams("data/teams.json")

print ("Testing GET player id...")
try:
    if db.get_player_id("Alex Abrines") != 203518:
        print ("GET Player ID Failed")
    else:
        print ("GET Player ID Passed")
except:
    print ("GET Player ID Failed")

print ("\nTesting GET team id...")
try:
    team_id = db.get_team_id("Boston Celtics")
    if team_id != 1610612738:
        print ("GET Team ID Failed")
    else:
        print ("GET Team ID Passed")
except:
    print ("GET Team ID Failed")


#### TEST FOR PLAYER GET ####
print ("\nTesting GET Players...")
try:
    r = requests.get('http://student04.cse.nd.edu:51033/players/')
    resp = json.loads(r.content.decode('utf-8'))
    if resp['result'] == 'success' and resp['players']:
        print ("GET Players Passed")
    else:
        print ("GET Players Failed")
except:
    print ("GET Players Failed")

#### TESTS FOR TEAMS GET ####
print ("\nTesting GET Teams...")
try:
    r = requests.get('http://student04.cse.nd.edu:51033/teams/')
    resp = json.loads(r.content.decode('utf-8'))
    if resp['result'] == 'success' and resp['teams']:
        print ("GET Teams Passed")
    else:
        print ("GET Teams Failed")
except:
    print ("GET Teams Failed")


#### TESTS FOR PVO POST ####
print ("\nTesting POST PlayerVsOpponent...")
try:
    pId = db.get_player_id("Kyrie Irving")
    tId = db.get_team_id("Cleveland Cavaliers")
    data = {"pId":pId, "tId" : tId}
    r = requests.post('http://student04.cse.nd.edu:51033/pvo/', data = json.dumps(data))
    resp = json.loads(r.content.decode('utf-8'))
    if resp['result'] == 'success' and resp['id']:
        print ("POST PlayerVsOpponent Passed")
    else:
        print ("POST PlayerVsOpponent Failed")
except:
    print ("POST PlayerVsOpponent Failed")

#### TESTS FOR PVO GET ####
print ("\nTesting GET PlayerVsOpponent...")
try:
    r = requests.get('http://student04.cse.nd.edu:51033/pvo/{}{}'.format(pId, tId))
    resp = json.loads(r.content.decode('utf-8'))
    if resp['result'] == 'success' and resp['data']:
        print ("GET PlayerVsOpponent Passed")
    else:
        print ("GET PlayerVsOpponent Failed")
except:
    print ("GET PlayerVsOpponent Failed")
