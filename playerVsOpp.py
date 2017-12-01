import json
import cherrypy

class PlayerVsOppController(object):
    def __init__(self, pvodb):
        self.pvodb = pvodb

    # outputs all stats for all cached player vs opponent data
    def GET(self):
        output = {"result":"success"}
        data = []
    
        for key, value in self.pvodb.playerTeam.items():
            data.append({"id":key, "SEASON_YEAR": value[0], "PLAYER_ID": value[1], "PLAYER_NAME": value[2], "TEAM_ID": value[3], "TEAM_ABBREVIATION": value[4], "TEAM_NAME": value[5], "GAME_ID": value[6], "GAME_DATE": value[7], "MATCHUP": value[8], "WL": value[9], "MIN": value[10], "FGM": value[11] , "FGA": value[12] , "FG_PCT": value[13] , "FG3M": value[14] , "FG3A": value[15] , "FG3_PCT": value[16] , "FTM": value[17] , "FTA": value[18] , "FT_PCT": value[19] , "OREB": value[20] , "DREB": value[21] , "REB": value[22] , "AST": value[23] , "TOV": value[24] , "STL": value[25] , "BLK": value[26] , "BLKA": value[27] , "PF": value[28] , "PFD": value[29] , "PTS": value[30] , "PLUS_MINUS": value[31] , "NBA_FANTASY_PTS": value[32] , "DD2": value[33] , "TD3": value[34] , "GP_RANK": value[35] , "W_RANK": value[36] , "L_RANK": value[37] , "W_PCT_RANK": value[38] , "MIN_RANK": value[39] , "FGM_RANK": value[40] , "FGA_RANK": value[41] , "FG_PCT_RANK": value[42] ,"FG3M_RANK": value[43] , "FG3A_RANK": value[44] , "FG3_PCT_RANK": value[45] , "FTM_RANK": value[46] , "FTA_RANK": value[47] , "FT_PCT_RANK": value[48] , "OREB_RANK": value[49] , "DREB_RANK": value[50] , "REB_RANK": value[51] , "AST_RANK": value[52] , "TOV_RANK": value[53] , "STL_RANK": value[54] , "BLK_RANK": value[55] , "BLKA_RANK" : value[56], "PF_RANK": value[57] , "PFD_RANK": value[58] , "PTS_RANK": value[59] , "PLUS_MINUS_RANK": value[60] , "NBA_FANTASY_PTS_RANK": value[61] , "DD2_RANK": value[62] , "TD3_RANK": value[63]})
        
        output["data"] = data
        return json.dumps(output)

    # returns stats for player vs opp given a key for specific player and team (their two ids merged)
    # should not happen unless POST with this key happens first
    def GET_KEY(self, key):
        output = {"result":"success"}
        info = self.pvodb.get_player_vs_team(int(key))
        
        if info is None:
            output["result"] = "error"
            output["message"] = "GET_KEY() in PlayerVsOpp no data"
        else:
            output["data"] = info
        
        return json.dumps(output)

    # user is requesting that we get data for a player vs a specific team and add it to db (that way get can be called)
    # returns the new id that will be used to store the stats in the db
    # new id is in format "pIDtID" where pID and tID are two separate numbers
    def POST(self):
        output = {"result":"success"}
        data = cherrypy.request.body.read().decode()
        data = json.loads(data)

        playerId = data["pId"]
        teamId = data["tId"]
        print ("{}, {}".format(playerId, teamId))
        stats = self.pvodb.fetch_data(int(playerId), int(teamId))
        playerTeamId = int(str(playerId) + str(teamId))

        try:
            self.pvodb.addPlayerTeam(playerTeamId, stats)
            output["id"] = playerTeamId
        except Exception as ex:
            output["result"] = "error"
            output["message"] = str(ex)
        
        return json.dumps(output)

