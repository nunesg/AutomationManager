import database

from api_types import ObjectData, SystemData, ActionData

SYSTEMS_TABLE_NAME = "Systems"
OBJECTS_TABLE_NAME = "Objects"
ACTIONS_TABLE_NAME = "Actions"

def get_systems():
    db = database.get_db()
    systems = db.execute(f"SELECT * FROM {SYSTEMS_TABLE_NAME}").fetchall() or []
    arr = [dict(s) for s in systems]
    print(f"systems = {arr}")
    return arr

def is_valid_system(systemId: int) -> bool:
    db = database.get_db()
    sys = db.execute(f"SELECT * FROM {SYSTEMS_TABLE_NAME} WHERE id = {systemId}").fetchall() or []
    dic = dict(sys[0]) if len(sys) > 0 else None
    print(f"found system {dic}")
    return len(sys) > 0

def is_valid_object(objId: int) -> bool:
    db = database.get_db()
    obj = db.execute(f"SELECT * FROM {OBJECTS_TABLE_NAME} WHERE id = {objId}").fetchall() or []
    dic = dict(obj[0]) if len(obj) > 0 else None
    print(f"found obj {dic}")
    return len(obj) > 0

def get_objects(systemId: int):
    if (not is_valid_system(systemId)):
        print(f"Not possible to get objects for system with id {systemId}")
        return []
    db = database.get_db()
    objects = db.execute(f"SELECT * FROM {OBJECTS_TABLE_NAME} WHERE system_id = ?;", (systemId, )).fetchall() or []
    arr = [dict(obj) for obj in objects]
    print(f"objects = {arr}")
    return arr

def add_object(objName, systemId):
    if (not is_valid_system(systemId)):
        msg = f"Not possible to add object {objName} for system with id {systemId}. Id doesn't exist"
        print(msg)
        return msg
    db = database.get_db()
    db.execute(f"INSERT INTO {OBJECTS_TABLE_NAME} (name, system_id) VALUES(?, ?)", (objName, systemId))
    db.commit()
    db.close()
    return f"Object {objName} added successfully referencing system {systemId}"

def add_system(name):
    print(f"add system {name}")
    db = database.get_db()
    db.execute(f"INSERT INTO {SYSTEMS_TABLE_NAME} (name) VALUES(?)", (name,))
    db.commit()
    db.close()

def delete_object(objId, systemId):
    if (not is_valid_system(systemId)):
        msg = f"Not possible to delete object {objId} for system with id {systemId}. system id doesn't exist"
        print(msg)
        return msg
    
    if (not is_valid_object(objId)):
        msg = f"Not possible to delete object {objId} for system with id {systemId}. object id doesn't exist"
        print(msg)
        return msg
    
    db = database.get_db()
    db.execute(f"DELETE FROM {OBJECTS_TABLE_NAME} WHERE id = ? AND system_id = ?;", (objId, systemId))
    db.commit()
    db.close()
    return f"Object {objId} deleted successfully from system {systemId}"

def delete_system(systemId):
    if (not is_valid_system(systemId)):
        print(f"Not possible to delete system with id {systemId}. Id doesn't exist")
        return
    db = database.get_db()
    db.execute(f"DELETE FROM {SYSTEMS_TABLE_NAME} WHERE id = ?;", (systemId,))
    db.commit()
    db.close()

# returns actions registered for a specific object
def get_actions(sysId, objId):
    print(f"get actions for system {sysId} and object {objId}")
    db = database.get_db()
    if (objId == None):
        return get_actions(sysId)
    
    actions_arr = db.execute(f"SELECT * FROM {ACTIONS_TABLE_NAME} WHERE system_id = {sysId} AND object_id = {objId}").fetchall() or []
    print(f"Actions array is {actions_arr}")
    arr = [dict(actions) for actions in actions_arr]
    print(f"actions for system {sysId} and obj {objId} = {arr}")
    return arr

def get_actions(systemId):
    print(f"Get actions for system {systemId}")
    if (not is_valid_system(systemId)):
        msg = f"Not possible to get actions for system with id {systemId}. Id doesn't exist"
        print(msg)
        return msg
    db = database.get_db()
    actions = db.execute(f"SELECT * FROM {ACTIONS_TABLE_NAME} WHERE system_id = {systemId}").fetchall() or []
    print(f"Actions array is {actions}")
    arr = [dict(action) for action in actions]
    print(f"actions for system {systemId} = {arr}")
    return arr

def add_action(actionData: ActionData):
    if (not is_valid_system(actionData.systemId)):
        msg = f"Not possible to add action {actionData.name} for system with id {actionData.systemId}. Id doesn't exist"
        print(msg)
        return msg
    db = database.get_db()
    db.execute(f"INSERT INTO {ACTIONS_TABLE_NAME} (name, system_id, object_id) VALUES(?, ?, ?)", (actionData.name, actionData.systemId, actionData.objectId))
    db.commit()
    db.close()
    return f"Action <{actionData.name}> added successfully referencing system {actionData.systemId} and object {actionData.objectId}"

def delete_action(actionData: ActionData):
    if (not is_valid_system(actionData.systemId)):
        msg = f"Not possible to delete action {actionData.id} for system with id {actionData.systemId}. system id doesn't exist"
        print(msg)
        return msg
    db = database.get_db()
    db.execute(f"DELETE FROM {ACTIONS_TABLE_NAME} WHERE id = ? AND system_id = ?;", (actionData.id, actionData.systemId))
    db.commit()
    db.close()
    return f"Action <{actionData.id}> deleted successfully"


### TESTS

###

# curl -X POST http://localhost:3050/api/list/systems \
#   -H "Content-Type: application/json" \
#   -d ''

# curl -X POST http://localhost:3050/api/list/objects \
#   -H "Content-Type: application/json" \
#   -d '{
#   "id": 15
# }'

# curl -X POST http://localhost:3050/api/list/actions \
#   -H "Content-Type: application/json" \
#   -d '{
#   "id": 15
# }'

# curl -X POST http://localhost:3050/api/add/action \
#   -H "Content-Type: application/json" \
#   -d '{
#         "id": 0,
#         "name": "FirstAction",
#         "systemId": 15,
#           "objectId": 4
#       }'

# curl -X POST http://localhost:3050/api/delete/action \
#   -H "Content-Type: application/json" \
#   -d '{
#         "id": 1,
#         "systemId": 15
#       }'
###