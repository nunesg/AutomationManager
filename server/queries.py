import database

SYSTEMS_TABLE_NAME = "Systems"
OBJECTS_TABLE_NAME = "Objects"
ACTIONS_TABLE_NAME = "Actions"

def get_systems():
    db = database.get_db()
    systems = db.execute(f"SELECT * FROM {SYSTEMS_TABLE_NAME}").fetchall() or []
    arr = [dict(s) for s in systems]
    print(f"systems = {arr}")
    return arr

def get_system(name):
    db = database.get_db()
    sys = db.execute(f"SELECT * FROM {SYSTEMS_TABLE_NAME} WHERE name = '{name}'").fetchall() or []
    dic = dict(sys[0]) if len(sys) > 0 else None
    print(f"found system {dic}")
    return dic

def get_objects(sysName):
    sys = get_system(sysName)
    db = database.get_db()
    objects = db.execute(f"SELECT * FROM {OBJECTS_TABLE_NAME} WHERE system_id = ?;", (sys.get('id'), )).fetchall() or []
    arr = [dict(obj) for obj in objects]
    print(f"objects = {arr}")
    return arr

def add_object(objName, sysName):
    sys = get_system(sysName)
    print(f"system = {sys}, id = {sys.get('id')}")
    if (sys == None or sys.get('id') == None):
        return "Not added"
    db = database.get_db()
    db.execute(f"INSERT INTO {OBJECTS_TABLE_NAME} (name, system_id) VALUES(?, ?)", (objName, sys.get('id')))
    db.commit()
    db.close()
    return f"Object {objName} added successfully referencing system {sysName}"

def add_system(name):
    print(f"add system {name}")
    db = database.get_db()
    db.execute(f"INSERT INTO {SYSTEMS_TABLE_NAME} (name) VALUES(?)", (name,))
    db.commit()
    db.close()

def delete_object(name, systemName):
    print(f"delete object {name} from system {systemName}")
    sys = get_system(systemName)
    print(f"system = {sys}, id = {sys.get('id')}")
    if (sys == None or sys.get('id') == None):
        return "Not deleted"
    db = database.get_db()
    db.execute(f"DELETE FROM {OBJECTS_TABLE_NAME} WHERE name = ? AND system_id = ?;", (name, sys.get('id')))
    db.commit()
    db.close()
    return f"Object {name} deleted successfully from system {systemName}"

def delete_system(name):
    print(f"delete system {name}")
    db = database.get_db()
    db.execute(f"DELETE FROM {SYSTEMS_TABLE_NAME} WHERE name = ?;", (name,))
    db.commit()
    db.close()

# returns actions registered for a specific object
def get_actions(sysId, objId = None):
    db = database.get_db()
    if (objId == None):
        return get_actions(sysId)
    actions_arr = db.execute(
        f"SELECT * FROM {ACTIONS_TABLE_NAME} WHERE system_id = ? AND object_id = ?;", 
        sysId, objId)
    arr = [dict(actions) for actions in actions_arr]
    print(f"actions for system {sysId} and obj {objId} = {arr}")
    return arr

def get_actions(sysId):
    db = database.get_db()
    actions = db.execute(f"SELECT * FROM {ACTIONS_TABLE_NAME} WHERE system_id = ?;", sysId)
    arr = [dict(action) for action in actions]
    print(f"actions for system {sysId} = {arr}")
    return arr

# todo: make this id based (need to update auxiliary methods and other apis)
def add_action(objName, sysName):
    sys = get_system(sysName)
    print(f"system = {sys}, id = {sys.get('id')}")
    if (sys == None or sys.get('id') == None):
        return "Not added"
    db = database.get_db()
    db.execute(f"INSERT INTO {OBJECTS_TABLE_NAME} (name, system_id) VALUES(?, ?)", (objName, sys.get('id')))
    db.commit()
    db.close()
    return f"Object {objName} added successfully referencing system {sysName}"
