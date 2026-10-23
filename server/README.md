# Automation Manager Server

This subfolder contains the server application that will be responsible for:
- managing the database
- handle client requests
- provide a single source of truth for the data schema that clients should use/expect

## Tech stack

- Python with FastAPI
- SQLite for database
- Hosted by Railway on https://automationmanager-production.up.railway.app

## Running the server on local machine

- Run bash script on terminal:
`sudo bash ./run_server.sh`
- Server should run on `http://localhost:3050`


## DB

The database utilises SQLite framework, which is based on local file manipulations to keep the db.

It maintains a `database.db` file on `AutomationManager/data/` folder which is stored as a persistent volume on the backend host, and is **NOT** included on git.

### To initialize the database

> ALERT!! this will erase existing db content

- Update `database.py` and `schema.sql`
- Run bash script on terminal: `sudo bash ./setup_db.sh`

## Supported APIs

- Check `server_main.py` file for routes implementations

### How to test APIs

You can test existing `POST` api endpoints by running a `curl` command from the terminal.
If the endpoint you're testing is a `GET` endpoint, you can even test it directly from the browser by adding the local address + api directly on the url:
- `http://localhost:3050/` (default endpoint that returns local ip address and hello world :) )

#### POST Examples

> the url can be "http://localhost:3050" or the prod api url "https://automationmanager-production.up.railway.app"

- ```bash
    curl -X POST https://automationmanager-production.up.railway.app/api/list/systems \
    -H "Content-Type: application/json" \
    -d ''
    ```

- ```bash
    curl -X POST http://localhost:3050/api/list/objects \
    -H "Content-Type: application/json" \
    -d '{
    "id": 15
    }'
    ```

- ```bash
    curl -X POST http://localhost:3050/api/add/action \
        -H "Content-Type: application/json" \
        -d '{
                "id": 0,
                "name": "FirstAction",
                "systemId": 15,
                "objectId": 4
            }'
    ```