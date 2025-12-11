from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import queries
import json
from api_types import ObjectData, SystemData, ActionData, ResponseData

app = FastAPI()
# allow frontend dev origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:3000", "http://192.168.1.22:3000", "http://192.168.1.19"],  # your React dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def setup_app():
    return

def list_systems():
    return json.dumps(queries.get_systems())

def list_objects(systemId):
    return json.dumps(queries.get_objects(systemId))

def list_actions(systemId):
    return json.dumps(queries.get_actions(systemId))

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/list/systems", response_model=ResponseData)
async def handle_list_systems():
    return {
        "ok": True,
        "message": "Request processed successfully",
        "dataJson": list_systems()
    }

@app.post("/api/add/system", response_model=ResponseData)
async def handle_add_system(data: SystemData):
    queries.add_system(data.name);
    return {
        "ok": True,
        "message": "System added successfully",
        "dataJson": list_systems()
    }

@app.post("/api/delete/system", response_model=ResponseData)
async def handle_delete_system(data: SystemData):
    queries.delete_system(data.name)
    return {
        "ok": True,
        "message": "System deleted successfully",
        "dataJson": list_systems()
    }

@app.post("/api/list/objects", response_model=ResponseData)
async def handle_list_objects(data: SystemData):
    return {
        "ok": True,
        "message": "Request processed successfully",
        "dataJson": list_objects(data.id)
    }

@app.post("/api/add/object", response_model=ResponseData)
async def handle_add_object(data: ObjectData):
    msg = queries.add_object(data.name, data.systemId)
    return {
        "ok": True,
        "message": msg,
        "dataJson": list_objects(data.systemId)
    }

@app.post("/api/delete/object", response_model=ResponseData)
async def handle_delete_object(data: ObjectData):
    msg = queries.delete_object(data.name, data.systemId)
    return {
        "ok": True,
        "message": msg,
        "dataJson": list_objects(data.systemId)
    }


@app.post("/api/list/actions", response_model=ResponseData)
async def handle_list_actions(data: SystemData):
    return {
        "ok": True,
        "message": "Request processed successfully",
        "dataJson": list_actions(data.id)
    }

@app.post("/api/add/action", response_model=ResponseData)
async def handle_add_action(data: ActionData):
    msg = queries.add_action(data)
    print(msg)
    return {
        "ok": True,
        "message": msg,
        "dataJson": list_actions(data.systemId)
    }

@app.post("/api/delete/action", response_model=ResponseData)
async def handle_delete_action(data: ActionData):
    msg = queries.delete_action(data)
    return {
        "ok": True,
        "message": msg,
        "dataJson": list_actions(data.systemId)
    }

def __main__():
    setup_app();