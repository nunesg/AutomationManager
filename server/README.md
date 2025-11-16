# Automation Manager Server

This subfolder contains the server application that will be responsible for:
- managing the database
- handle client requests
- provide a single source of truth for the data schema that clients should use/expect

## Tech stack

- Python with FastAPI
- SQLite for database

## Running instructions

- Run bash script on terminal:
`sudo bash ./run_server.sh`
- Server should run on `http://localhost:3050`

## Supported APIs

- Check `server_main.py` file for routes implementations
- Test routes like `http://localhost:3050/itens`