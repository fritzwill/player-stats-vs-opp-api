from _player_vs_opp_database import _player_vs_opp_database

db = _player_vs_opp_database()
db.load_players("data/players.json")
db.load_teams("data/teams.json")
db.fetch_data("Alex Abrines", "Boston Celtics")
print ("Testing GET player id...")
if db.get_player_id("Alex Abrines") != 203518:
    print ("Get Player ID Failed")
else:
    print ("Get Player ID Passed")

print ("Testing GET team id...")
team_id = db.get_team_id("Boston Celtics")
if team_id != 1610612738:
    print ("Get Team ID Failed")
else:
    print ("Get Team ID Passed")

