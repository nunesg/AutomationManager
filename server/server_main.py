from typing import Union, List

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import queries
import json
from api_types import ObjectData, SystemData, ActionData, ResponseData
from callbuffer import CallItem, CallBuffer
import os


app = FastAPI()
ip = os.environ.get("AUTOMATION_MANAGER_BACKEND_IP")
callBuffer = CallBuffer()

# allow frontend dev origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", f"http://{ip}:3000"],
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
    return {"Hello": "World", "ip": f"{ip}"}

@app.get(
    "/buffer/actions/{system_id}/{module_id}",
    response_model=List[CallItem],
    summary="Get and remove buffered actions for a specific system and module"
)
def get_buffered_actions(system_id: int, module_id: int):
    """Retrieves and removes all buffered CallItems matching the given systemId and moduleId.
    
    - **system_id**: ID of the target system
    - **module_id**: ID of the target module
    """
    try:
        # Pop matching items from the buffer
        matched_items = callBuffer.popFrom(systemId=system_id, moduleId=module_id)
        print(f"returning buffered items: ${json.dumps(matched_items)}")
        return matched_items
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while accessing the buffer: {str(e)}"
        )

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
    queries.delete_system(data.id)
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
    msg = queries.delete_object(data.id, data.systemId)
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

@app.post("/api/call/action", response_model=ResponseData)
async def handle_call_action(data: ActionData):
    if not (queries.is_valid_system(data.systemId) and queries.is_valid_object(data.objectId)):
        return {
            "ok": False,
            "message": "System or object invalid.",
            "dataJson": ""
        }
    
    print(f"Call action {data.name}")
    callBuffer.push(
        CallItem(
            name=data.name,
            systemId=data.systemId,
            moduleId=data.objectId
        )
    )
    return {
        "ok": True,
        "message": f"Action {data.name} queued successfully.",
        "dataJson": ""
    }

def __main__():
    setup_app()