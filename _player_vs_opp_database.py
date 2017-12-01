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
            #print (self.players)

    def load_teams(self, filename):
        with open(filename) as f:
            self.teams = json.load(f)
            print (self.teams)

    def get_team(self, teamName):
        for team in self.teams:
            if team['teamName'].lower() == teamName.lower():
                return team
        return None


    def get_player_id(self, name):
        firstName, lastName = name.split()
        playerId = -1
        for player in self.players:
            if player['firstName'].lower() == firstName.lower() and player['lastName'].lower() == lastName.lower():
                playerId = player['playerId']
        return playerId
             
    def get_team_id(self, teamName):
        oppId = -1
        for team in self.teams:
            if team['teamName'].lower() == teamName.lower():
                oppId = team['teamId']
        return oppId
    
    def fetch_data(self, player, oppTeam):
        playerId = self.get_player_id(player)
        oppTeamId = self.get_team_id(oppTeam)
        url = "http://stats.nba.com/stats/playergamelogs?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID={}&Outcome=&PORound=0&PaceAdjust=N&PerMode=Totals&Period=0&PlayerID={}&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&VsConference=&VsDivision=".format(oppTeamId, playerId)
        custHeaders = {'user-agent': (
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) ' 
        'AppleWebKit/537.36 (KHTML, like Gecko) '
        'Chrome/45.0.2454.101 Safari/537.36'),
        'referer': 'http://stats.nba.com/scores/'}
        r = requests.get(url, headers=custHeaders)
        r.raise_for_status() 
        print(r.json()['resultSets'][0]['rowSet'])
