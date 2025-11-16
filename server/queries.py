import database

SYSTEMS_TABLE_NAME = "Systems"

def get_systems():
    db = database.get_db()
    systems = db.execute(f"SELECT * FROM {SYSTEMS_TABLE_NAME}").fetchall() or []
    arr = [dict(s) for s in systems]
    print(f"systems = {arr}")
    return arr
    

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