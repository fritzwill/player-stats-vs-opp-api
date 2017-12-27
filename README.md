# playerVsOppApi

This API is meant to be used for the user to find stats for a player given the opponent team name along with the name of the player. This shuld be used to get stats for the current nba season regarding how a certain player performs against an opposing team. This works by utilizing the fact that stats.nba.com has a client side api that it uses to opbtain data. This api was deciphered and used to get the info we wanted. The feature here is that it can take a player name and an opponent team name and then return an array of data containting all the matchup data.

**Set up web server that uses OO API + RESTful JSON spec**

GET /teams/
returns all team data

GET /teams/:key
returns specific team data given key

GET /players/
returns all player data

GET /players/:key
returns specific player data given key

GET /pvo/
returns all cached statistics for all players vs all teams

GET /pvo/:key
returns cached statistics for a single player vs a single team given a key

POST /pvo/
adds new statistics to cache for a given player and team specified by pId and tId in the post json
returns a key used to reference this cached member

The POST for /pvo/ is used so that when GET /pvo/:key is requested, a s single key can just be used. Since this key is a custom key created by the server a GET /pvo/:key must come after a POST /pvo/ that creates this cutom key and stores the statistics in the cache used by the database. This was done this way to make the requests simplet for /pvo/ as well as minimizing the amount of times we have to scrape from stats.nba.com

The port numebr used is 51033. In other words the server runs on http://student04.cse.nd.edu:51033/. This server should be used by a customer if they want to get past game statistics for a player versus a specific team. Also, this api can be used to get general info for a specific team seuch as abbreviation and full team name. Multiple parts of the api can be used together to get useful info such as what player plays for what team. Mainly ther server offers a useful way to get stattistics for a player vs a specific team which is useful in statistical analysis of basketball. 

The server can be run using the command 'python3 main.py'.  It will run the server, and the url that the GUI can be accessed at is 'student04.cse.nd.edu/tlynch2/t2l7y0n5ch/playerVsOppApi/'.  Once at this page, you can get the statistics for a specific player against a specific team by following the instructions provided.  
