from sqlmodel import SQLModel, Field
from typing import Optional
from uuid import UUID, uuid4


class Flow(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
    name: str
    nodes: str
    edges: str
    user_id: Optional[UUID]
