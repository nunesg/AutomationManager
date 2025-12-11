
from pydantic import BaseModel
from typing import Optional

class SystemData(BaseModel):
    id: int
    name: Optional[str] = None

class ObjectData(BaseModel):
    id: int
    systemId: int
    name: Optional[str] = None

class ActionData(BaseModel):
    id: int
    systemId: int
    objectId: Optional[int] = None
    name: Optional[str] = None

class ResponseData(BaseModel):
    ok: bool
    message: str = ""
    dataJson: Optional[str] = "{}"