from sqlmodel import SQLModel, Field
from typing import Optional


class Flow(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    nodes: str
    edges: str
    user_id: Optional[int]
