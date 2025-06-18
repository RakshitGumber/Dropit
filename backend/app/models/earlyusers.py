from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import datetime


class EarlyUser(SQLModel, table=True):
    id: Optional[int] = Field(default=0, primary_key=True, index=True)
    username: str = Field(index=True, nullable=False, unique=True)
    email: str = Field(nullable=False, unique=True)
    joined_at: datetime = Field(default_factory=datetime.now)
