import cherrypy
import json


class TeamsController(object):
    def __init__(self, sdb):
        self.sdb = sdb
    
    def GET(self):
        output = {'result' : 'success'}
        teamList = []
        flag = True
        for team in self.sdb.teams:
            try:
                currTeam = {}
                for k, v in team.items():
                    currTeam[k] = v
                teamList.append(currTeam)
            except Exception as e:
                output['result'] = 'error'
                output['message'] = str(e)
                flag = False
        if flag:
            output['teams'] = teamList
        return json.dumps(output)


    def GET_KEY(self, key):
        output = {'result' : 'success'}
        key = int(key)
        description = self.sdb.get_team(key)
        if description is None:
            output['result'] = 'error'
            output['message'] = 'team not found'
        else:
            output['teamName'] = description['teamName']
            output['teamId'] = description['teamId']
            output['abbreviation'] = description['abbreviation']
            output['simpleName'] = description['simpleName']
            output['location'] = description['location']
        return json.dumps(output)
