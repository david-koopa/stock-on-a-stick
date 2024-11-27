# Stock on a Stick

## What is this?

Boilerplate for Stock Tracking Web app

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
```

## How to start it? 

Make sure Docker Desktop is running and you've set your environment variables properly.

```
docker compose up -d
```
*This will take a while the first time. See bottom thread for local troubleshooting.

Browse to `localhost:8080`.

## Tips along the way

### Some available routes
GET - /user (get list of current users)
POST - /user (create single user)

### Access MySQL from Docker
Bash into container or user Docker Desktop. Access stock_db with `mysql` command (password is whatever you set in .env).

```
mysql -p stock_db
```

Should get a `mysql>` terminal up to run `SHOW`, `SELECT`, etc.


### If you're seeing long (like 100s+) installs for npm, as a last resort try pruning your builder and rebuild / re-up.
```
docker builder prune
docker compose up -d
```

### Next steps
- Setup integration with Stock API (finnhub)
- Setup basic routes (get stock info for stock X, list available stocks)
- Update Prereq to make sure we get token, add to env
- Setup Either long polling or web socket (pref) to watch stock(s) for user
- Get Basic React Web App Up
- Add RWA to Docker Compose
- Modify RWA to basic experience (enter user, watch stock(s))