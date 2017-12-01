from bs4 import BeautifulSoup
import requests
import json

class _player_vs_opp_database:
    
    def __init__(self):
        self.players = {} # player data
        self.teams = {} # team data
        self.playerTeam = {} # player vs a team stats
    
    # uses json file to populate players dict
    def load_players(self, filename):
        with open(filename) as f:
            self.players = json.load(f)
            #print (self.players)

    # uses json file to populate teams dict
    def load_teams(self, filename):
        with open(filename) as f:
            self.teams = json.load(f)
            #print (self.teams)

    # returns team data given team id
    def get_team(self, teamId):
        for team in self.teams:
            if team['teamId'] == teamId:
                return team
        return None

    # returns player data given player id
    def get_player(self, playerId):
        for player in self.players:
            if player['playerId'] == playerId:
                return player
        return None

    # returns playerId given the name of the player (not case sensitve but needs exact match otherwise)
    def get_player_id(self, name):
        firstName, lastName = name.split()
        playerId = -1
        for player in self.players:
            if player['firstName'].lower() == firstName.lower() and player['lastName'].lower() == lastName.lower():
                playerId = player['playerId']
        return playerId
             
    # return teamId given the name of the team (not case sensitive but needs exact match otherwise)
    def get_team_id(self, teamName):
        oppId = -1
        for team in self.teams:
            if team['teamName'].lower() == teamName.lower():
                oppId = team['teamId']
        return oppId

    # gets vs team statistics given a key (which is the combination of playerid and teamid)
    def get_player_vs_team(self, key):
        try:
            data = self.playerTeam[int(key)]
        except KeyError:
            data = None
        return data

    # add stats for a player vs team into the cache used in the db (playerTeam)
    def addPlayerTeam(self, playerTeamId, stats):
        self.playerTeam[playerTeamId] = stats

    # needed whenever new statistics are required from the client
    # return statistics given a player id and team id
    # used to populate the cache in the db (playerTeam)
    def fetch_data(self, pId, tId):
        url = "http://stats.nba.com/stats/playergamelogs?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID={}&Outcome=&PORound=0&PaceAdjust=N&PerMode=Totals&Period=0&PlayerID={}&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&VsConference=&VsDivision=".format(pId, tId)
        custHeaders = {'user-agent': (
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) ' 
        'AppleWebKit/537.36 (KHTML, like Gecko) '
        'Chrome/45.0.2454.101 Safari/537.36'),
        'referer': 'http://stats.nba.com/scores/'}
        r = requests.get(url, headers=custHeaders)
        r.raise_for_status() 
        return r.json()['resultSets'][0]['rowSet']
