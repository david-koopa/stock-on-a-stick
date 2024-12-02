# Stock on a Stick

## What is this?

Stock Tracking Web App

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
- GET - localhost:6868/user (get list of current users)
- POST - localhost:6868/user (create single user)

### Webapp routes
- http://localhost:8888 (home)

### Access MySQL from Docker
Bash into container or user Docker Desktop. Access stock_db with `mysql` command (password is whatever you set in .env). Password is whatever you set in .env file.

```
mysql -p stock_db
```

Should get a `mysql>` terminal up to run `SHOW`, `SELECT`, etc.


### If you're seeing long (like 100s+) installs for npm, as a last resort try pruning your builder and rebuild / re-up. Testing locally, builds should take ~10-20 seconds, depending on your internet connection. 
```
docker builder prune
docker compose up -d
```

### (ignore, personal notes) Next steps
- Setup integration with Stock API (finnhub)
- Setup basic routes (get stock info for stock X, list available stocks)
- Update Prereq to make sure we get token, add to env
- Setup Either long polling or web socket (pref) to watch stock(s) for user
- ~Get Basic React Web App Up (use create-react-app from npx)~
- ~Add RWA to Docker Compose~
- Modify RWA to basic experience (enter user, watch stock(s))

### Rough Implementation to Branch From
[!basic implementation](./resources/basic_impl.mp4)