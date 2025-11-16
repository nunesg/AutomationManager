import database

def get_items(table_name):
    db = database.get_db()
    items = db.execute(f"SELECT * FROM {table_name}").fetchall() or []
    print(f"items = {items}")
    return [dict(s) for s in items]
    

def add_item(name, table_name):
    print(f"add item {name}")
    db = database.get_db()
    db.execute(f"INSERT INTO {table_name} (name) VALUES(?)", (name,))
    db.commit()
    db.close()

def remove_item(name, table_name):
    print(f"delete item {name}")
    db = database.get_db()
    db.execute(f"DELETE FROM {table_name} WHERE name = ?;", (name,))
    db.commit()
    db.close()