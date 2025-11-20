
from pydantic import BaseModel
from typing import Optional

class SystemData(BaseModel):
    id: Optional[int] = None
    name: str

class ObjectData(BaseModel):
    id: Optional[int] = None
    name: str
    systemName: str

class ResponseData(BaseModel):
    ok: bool
    message: str = ""
    dataJson: Optional[str]