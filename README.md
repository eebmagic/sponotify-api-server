# Sponotify Api Server

This could is used to allow for the react front-end for Sponotify to be able to interact with a mongo database.

## Setup
Requires adding a `config.env` file in the project's root directory.
Should have three params:
```
ATLAS_URI=mongodb://127.0.0.1:27017
PORT=5001
DB_NAME=sponotify
```

Where:
- `ATLAS_URI` is the access uri for the mongodb instance
- `PORT` is the port the server should listen on (port that api calls are made to)
- `DB_NAME` is the specific db on the mongo instance
