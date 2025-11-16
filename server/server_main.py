from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import queries
import json

app = FastAPI()

# allow frontend dev origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # your React dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

table_name = "Systems"

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/add/{item_name}")
def add_item(item_name):
    queries.add_item(item_name, table_name);
    return list_items()
    
@app.get("/itens")
def list_items():
    return json.dumps([dict(s) for s in queries.get_items(table_name)])

@app.get("/delete/{name}")
def delete_items(name):
    queries.remove_item(name, table_name)
    return list_items()