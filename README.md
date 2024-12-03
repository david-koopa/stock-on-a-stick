# Stock on a Stick

## What is this?

Stock Tracking Web App

## Rough Diagram
![Diagram](./resources/Screenshot%202024-12-02%20112436.png)
Originally had a plan to have multiple users with different stocks, but removed that to just get something done. 

## Prerequistes 

Docker
Docker Compose

Copy .env.template to .env
```
cp .env.template .env
```

Fill variables (dummy local setup below)
```
MYSQLDB_USER=root
MYSQLDB_ROOT_PASSWORD=123456
MYSQLDB_DATABASE=stock_db
MYSQLDB_DOCKER_PORT=3306

FINNHUB_TOKEN=<aquire from making an account at https://finnhub.io; or ping dev for https://share.doppler.com/ approach>
```

## How to start it? 

Make sure Docker Desktop is running and you've set your environment variables properly.

```
docker compose build
docker compose up -d
```
*This will take a while the first time. See bottom thread for local troubleshooting, if npm installs taking 100+ seconds.

Browse to `http://localhost:8888/`.

### API routes
- POST - localhost:6868/watch (add a stock to watch, must be in NASDAQ)

### Webapp routes
- http://localhost:8888 (home)

### Access MySQL from Docker
Bash into container or user Docker Desktop. Access stock_db with `mysql` command (password is whatever you set in .env). Password is whatever you set in .env file.

```
mysql -p
```

Should get a `mysql>` terminal up to run `SHOW`, `SELECT`, etc.


### If you're seeing long (like 100s+) installs for npm, as a last resort try pruning your builder and rebuild / re-up. Testing locally, builds should take ~10-20 seconds, depending on your internet connection. 
```
docker builder prune
docker compose up -d
```

### (ignore, personal notes) Next steps
- ~Setup integration with Stock API (finnhub)~
- ~Setup basic routes (get stock info for stock X, list available stocks)~
- ~Update Prereq to make sure we get token, add to env~
- ~Setup Either long polling or web socket (pref) to watch stock(s) for user~
- ~Get Basic React Web App Up (use create-react-app from npx)~
- ~Add RWA to Docker Compose~
- Modify RWA to basic experience (enter user, watch stock(s))

### Rough Implementation to Branch From
https://github.com/user-attachments/assets/5e37bdac-452b-4cd2-b165-6e320f09839f

1. Follow stocks (default NASDAQ)

Future Features
1. See and Follow "popular" stocks (simple most user count on user_stock table, if we integrate user table back in)
2. Disable View during weekend (when market is down)
3. Swap between markets (NASDAQ, NYSE, Crypto, etc)
4. Show stocks for users on load ... right now it is kind of basic and only watches when you add
5. Add ability to unsubscribe / stop watching stock 
6. Graphs
7. Improved Input that shows available stocks (maybe swap for option / select)