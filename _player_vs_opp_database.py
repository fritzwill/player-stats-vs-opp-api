from bs4 import BeautifulSoup
import requests
import json

class _player_vs_opp_database:
    
    def __init__(self):
        self.players = {}
        self.teams = {}
    
    def load_players(self, filename):
        with open(filename) as f:
            self.players = json.load(f)

    def load_teams(self, filename):
        with open(filename) as f:
            self.teams = json.load(f)
    
    def get_player_id(self, name):
        firstName, lastName = name.split()
        playerId = -1
        for player in self.players:
            if player['firstName'] == firstName and player['lastName'] == lastName:
                playerId = player['playerId']
        return playerId
             
    def get_team_id(self, teamName):
        oppId = -1
        for team in self.teams:
            if team['teamName'] == teamName:
                oppId = team['teamId']
        return oppId
    
    def fetch_data(self, player, oppTeam):
        playerId = self.get_player_id(player)
        oppTeamId = self.get_team_id(oppTeam)
        url = "http://stats.nba.com/stats/playergamelogs?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=1610612738&Outcome=&PORound=0&PaceAdjust=N&PerMode=Totals&Period=0&PlayerID=203518&PlusMinus=N&Rank=N&Season=2016-17&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&VsConference=&VsDivision="
        custHeaders = {'user-agent': (
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) ' 
        'AppleWebKit/537.36 (KHTML, like Gecko) '
        'Chrome/45.0.2454.101 Safari/537.36'),
        'referer': 'http://stats.nba.com/scores/'}
        r = requests.get(url, headers=custHeaders)
        r.raise_for_status() 
        print(r.json())
