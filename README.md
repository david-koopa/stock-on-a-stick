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
docker compose up
```
*This will take a while the first time. See bottom thread for local troubleshooting.

Browse to `localhost:8080`.

## Some available routes
GET - /user (get list of current users)
POST - /user (create single user)

## Access MySQL from Docker
Bash into container or user Docker Desktop. Access stock_db with `mysql` command (password is whatever you set in .env).

```
mysql -p stock_db
```

Should get a `mysql>` terminal up to run `SHOW`, `SELECT`, etc.


## If you're seeing long (like 100s+ installs for npm), as a last resort try pruning your builder.
```
docker builder prune
```