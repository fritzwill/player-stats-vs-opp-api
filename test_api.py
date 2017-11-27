from _player_vs_opp_database import _player_vs_opp_database


db = _player_vs_opp_database()
db.load_players("data/players.json")
db.load_teams("data/teams.json")
db.fetch_data("Alex Abrines", "Boston Celtics")
