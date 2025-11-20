from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import queries
import json
from api_types import ObjectData, SystemData, ResponseData

app = FastAPI()
# allow frontend dev origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:3000"],  # your React dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def setup_app():
    return

def list_systems():
    return json.dumps(queries.get_systems())

def list_objects(sysName):
    return json.dumps(queries.get_objects(sysName))

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


@app.post("/api/list/objects", response_model=ResponseData)
async def handle_list_objects(data: SystemData):
    return {
        "ok": True,
        "message": "Request processed successfully",
        "dataJson": list_objects(data.name)
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

@app.post("/api/add/object", response_model=ResponseData)
async def handle_add_object(data: ObjectData):
    msg = queries.add_object(data.name, data.systemName)
    return {
        "ok": True,
        "message": msg,
        "dataJson": list_objects(data.systemName)
    }

def __main__():
    setup_app();