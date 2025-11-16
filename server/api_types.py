
from pydantic import BaseModel
from typing import Optional

class SystemData(BaseModel):
    id: Optional[int] = None
    name: str

class ResponseData(BaseModel):
    ok: bool
    message: str = ""
    dataJson: Optional[str]