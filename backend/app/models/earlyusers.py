from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import datetime


class EarlyUser(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, nullable=False)
    email: str = Field(nullable=False)
    joined_at: datetime = Field(default_factory=datetime.now)
