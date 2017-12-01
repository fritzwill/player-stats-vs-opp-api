import cherrypy
import requests
from _player_vs_opp_database import _player_vs_opp_database
from teams import TeamsController
from players import PlayersController
from playerVsOpp import PlayerVsOppController

TEAMPATH = "data/teams.json"
PLAYERPATH = "data/players.json"
PORT = 51033

def CORS():
    cherrypy.response.headers["Access-Control-Allow-Original"] = "*"
    cherrypy.response.headers["Access-Control-Allow-Methods"] = "GET, POST"
    cherrypy.response.headers["Access-Control-Allow-Credentials"] = "*"

def initDb(pvodb):
    pvodb.load_players(PLAYERPATH)
    pvodb.load_teams(TEAMPATH)
    return pvodb

def start_service():
    pvodb = _player_vs_opp_database()
    pvodb = initDb(pvodb)
    
    teamsCont = TeamsController(pvodb)
    playersCont = PlayersController(pvodb)
    playerVsOppCont = PlayerVsOppController(pvodb)

    dis = cherrypy.dispatch.RoutesDispatcher()
    
    dis.connect('teams_get', '/teams/', controller=teamsCont, action='GET', conditions=dict(method=['GET']))

    dis.connect('teams_get_key', '/teams/:key', controller=teamsCont, action='GET_KEY', conditions=dict(method=['GET']))

    dis.connect('players_get', '/players/', controller=playersCont, action='GET', conditions=dict(method=['GET']))

    dis.connect('players_get_key', '/players/:key', controller=playersCont, action='GET_KEY', conditions=dict(method=['GET']))

    dis.connect('player_vs_opp_get', '/pvo/', controller=playerVsOppCont, action='GET', conditions=dict(method=['GET']))

    dis.connect('player_vs_opp_get_key', '/pvo/:key', controller=playerVsOppCont, action='GET_KEY', conditions=dict(method=['GET']))

    dis.connect('palyer_vs_opp_post', '/pvo/', controller=playerVsOppCont, action='POST', conditions=dict(method=['POST']))

    
    conf = { 'global' : 
                {'server.socket_host' : 'student04.cse.nd.edu',
                'server.socket_port' : PORT},
            '/' : {'request.dispatch' : dis,
                    'tools.CORS.on' : True}
    }
    cherrypy.config.update(conf)
    app = cherrypy.tree.mount(None, config=conf)
    cherrypy.quickstart(app)

if __name__ == '__main__':
    cherrypy.tools.CORS = cherrypy.Tool('before finalize', CORS)
    start_service()
