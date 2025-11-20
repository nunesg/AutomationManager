import database

SYSTEMS_TABLE_NAME = "Systems"
OBJECTS_TABLE_NAME = "Objects"

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

def delete_system(name):
    print(f"delete system {name}")
    db = database.get_db()
    db.execute(f"DELETE FROM {SYSTEMS_TABLE_NAME} WHERE name = ?;", (name,))
    db.commit()
    db.close()