from typing import Optional
from uuid import UUID, uuid4
from sqlmodel import SQLModel, Field
from datetime import datetime


class User(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True, index=True)
    username: str = Field(index=True, nullable=False, unique=True)
    email: str = Field(nullable=False, unique=True)
    email_verified: bool = Field(default=False)
    password_hashed: str = Field(nullable=False)
    full_name: Optional[str] = None
    profile_pic_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
